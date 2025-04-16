import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { catchError, of, tap } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list.page.html',
})
export class DishListPage implements OnInit {
  title = signal('Plats du monde');
  filter = signal('');
  dishes = signal<Dish[]>([]);
  status = signal<'idle' | 'loading' | 'resolved' | 'error'>('idle');
  error = signal('');
  subtitle = computed(() => {
    return `${this.dishes().length} plats internationaux`;
  });
  dishService = inject(DishService);
  toast = inject(ToastService);

  search() {
    this.getDishes().subscribe((dishes) => {
      this.dishes.set(dishes);
    });
  }

  getDishes() {
    this.status.set('loading');

    return this.dishService.getDishes(this.filter()).pipe(
      tap(() => {
        this.status.set('resolved');
      }),
      catchError(() => {
        this.status.set('error');
        this.error.set('Une erreur est survenue.');
        return of([] as Dish[]);
      }),
    );
  }

  constructor() {
    effect(() => {
      const error = this.error();
      if (error) {
        this.toast.error(error);
      }
    });
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
