import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DishCard } from '../dish-card/dish-card';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish-service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { LoaderStatus } from '../loader-status';
import { ToastService } from '../toast/toast.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dish-list-page',
  imports: [DishCard, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list-page.html',
})
export class DishListPage {
  title = 'Plats du monde';
  filter = signal('');
  status = signal<LoaderStatus>('idle');
  error = signal('');
  subtitle = computed(() => `${this.$dishes().length} plats internationaux`);

  dishService = inject(DishService);
  toast = inject(ToastService);
  $dishes: WritableSignal<Dish[]>;

  constructor() {
    const filter$ = toObservable(this.filter).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const dishes$ = filter$.pipe(switchMap(() => this.getDishes()));

    this.$dishes = linkedSignal(toSignal(dishes$, { initialValue: [] }));

    effect(() => {
      const error = this.error();
      if (error) {
        this.toast.error(error);
      }
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

  deleteDish(dishId: string) {
    this.$dishes.update((dishes) =>
      dishes.filter((dish) => dish.id !== dishId),
    );
    this.dishService.deleteDish(dishId).subscribe();
  }

  likeDish(dishId: string) {
    this.dishService.likeDish(dishId).subscribe();
  }

  unlikeDish(dishId: string) {
    this.dishService.unlikeDish(dishId).subscribe();
  }
}
