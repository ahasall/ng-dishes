import { Component, computed, effect, inject, ResourceRef, signal } from '@angular/core';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { ToastService } from '../toast/toast.service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list.page.html',
})
export class DishListPage {
  title = signal('Plats du monde');
  filter = signal('');
  dishes: ResourceRef<Dish[]>;
  status = signal<'idle' | 'loading' | 'resolved' | 'error'>('idle');
  error = signal('');
  subtitle = computed(() => {
    return `${this.dishes.value().length} plats internationaux`;
  });
  dishService = inject(DishService);
  toast = inject(ToastService);

  constructor() {
    const filter$ = toObservable(this.filter).pipe(debounceTime(1000), distinctUntilChanged());
    const $filter = toSignal(filter$, { initialValue: '' });

    this.dishes = rxResource({
      request: () => ({
        filter: $filter(),
      }),
      loader: ({ request }) => {
        return this.dishService.getDishes(request.filter);
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
    this.dishService.deleteDish(dishId).subscribe(() => this.dishes.reload());
  }

  likeDish(dishId: string) {
    this.dishService.likeDish(dishId).subscribe();
  }

  unlikeDish(dishId: string) {
    this.dishService.unlikeDish(dishId).subscribe();
  }
}
