import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DishCard } from '../dish-card/dish-card';
import { catchError, of, tap } from 'rxjs';
import { Dish } from '../dish';
import { DishService } from '../dish-service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { LoaderStatus } from '../loader-status';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-dish-list-page',
  imports: [DishCard, FormsModule, SpinnerComponent, ErrorComponent],
  templateUrl: './dish-list-page.html',
})
export class DishListPage implements OnInit {
  title = 'Plats du monde';
  filter = signal('');
  dishes = signal<Dish[]>([]);
  status = signal<LoaderStatus>('idle');
  error = signal('');
  subtitle = computed(() => `${this.dishes().length} plats internationaux`);

  dishService = inject(DishService);
  toast = inject(ToastService);

  constructor() {
    effect(() => {
      const error = this.error();
      if (error) {
        this.toast.error(error);
      }
    });
  }

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
