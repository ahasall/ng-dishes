import { Component, inject, OnInit } from '@angular/core';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { catchError, of, tap } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list.page.html',
})
export class DishListPage implements OnInit {
  title = 'Plats du monde';
  filter = '';
  dishes: Dish[] = [];
  status: 'idle' | 'loading' | 'resolved' | 'error' = 'idle';
  error = '';
  get subtitle() {
    return `${this.dishes.length} plats internationaux`;
  }

  dishService = inject(DishService);

  search() {
    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  getDishes() {
    this.status = 'loading';

    return this.dishService.getDishes(this.filter).pipe(
      tap(() => {
        this.status = 'resolved';
      }),
      catchError(() => {
        this.status = 'error';
        this.error = 'Une erreur est survenue.';
        return of([] as Dish[]);
      }),
    );
  }

  ngOnInit(): void {
    this.search();
  }

  deleteDish(dishId: string) {
    this.dishService
      .deleteDish(dishId)
      .pipe(
        tap(() => {
          this.search();
        }),
      )
      .subscribe();
  }

  likeDish(dishId: string) {
    this.dishService.likeDish(dishId).subscribe();
  }

  unlikeDish(dishId: string) {
    this.dishService.unlikeDish(dishId).subscribe();
  }
}
