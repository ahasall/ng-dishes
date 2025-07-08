import {
  Component,
  computed,
  effect,
  inject,
  resource,
  ResourceRef,
  signal,
} from '@angular/core';
import { DishCard } from '../dish-card/dish-card';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish-service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
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
  error = signal('');
  subtitle = computed(() => {
    let count = (this.$dishes.hasValue() && this.$dishes.value().length) || 0;
    return `${count} plats internationaux`;
  });

  dishService = inject(DishService);
  toast = inject(ToastService);
  $dishes: ResourceRef<Dish[]>;

  constructor() {
    const filter$ = toObservable(this.filter).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const $filter = toSignal(filter$, { initialValue: '' });

    this.$dishes = resource({
      params: () => ({
        filter: $filter(),
      }),
      loader: ({ params }) => {
        return firstValueFrom(this.dishService.getDishes(params.filter));
      },
      defaultValue: [],
    });

    effect(() => {
      const error = this.error();
      if (error) {
        this.toast.error(error);
      }
    });
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
