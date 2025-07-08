import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DishService } from '../dish-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dish-details-page',
  templateUrl: './dish-details-page.html',
  imports: [RouterLink],
  host: {
    class: 'wma-mini-container',
  },
})
export class DishDetailsPage {
  dishId = inject(ActivatedRoute).snapshot.paramMap.get('dishId')!;
  service = inject(DishService);
  $dish = toSignal(this.service.getDish(this.dishId));
  $discount = toSignal(this.service.getDishDiscount(this.dishId));
}
