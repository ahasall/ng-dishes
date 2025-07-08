import { Component, inject, OnInit } from '@angular/core';
import { DishCard } from '../dish-card/dish-card';
import { catchError, of, tap } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish-service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { LoaderStatus } from '../loader-status';

@Component({
  selector: 'app-dish-list-page',
  imports: [DishCard, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list-page.html',
})
export class DishListPage implements OnInit {
  title = 'Plats du monde';
  filter = '';
  dishes: Dish[] = [];
  status: LoaderStatus = 'idle';
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
