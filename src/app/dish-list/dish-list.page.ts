import { Component, computed, effect, inject, signal } from '@angular/core';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { ToastService } from '../toast/toast.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list.page.html',
})
export class DishListPage {
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
    const filter$ = toObservable(this.filter).pipe(debounceTime(1000), distinctUntilChanged());
    const dishes$ = filter$.pipe(switchMap(() => this.getDishes()));
    dishes$.subscribe((dishes) => {
      this.dishes.set(dishes);
    });

    effect(() => {
      const error = this.error();
      if (error) {
        this.toast.error(error);
      }
    });
  }

  deleteDish(dishId: string) {
    this.dishes.update((dishes) => dishes.filter((dish) => dish.id !== dishId));
    this.dishService.deleteDish(dishId).subscribe();
  }

  likeDish(dishId: string) {
    this.dishService.likeDish(dishId).subscribe();
  }

  unlikeDish(dishId: string) {
    this.dishService.unlikeDish(dishId).subscribe();
  }
}
