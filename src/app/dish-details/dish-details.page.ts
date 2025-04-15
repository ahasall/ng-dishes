import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../dish.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.page.html',
  imports: [AsyncPipe],
  host: {
    class: 'wma-mini-container',
  },
})
export class DishDetailsPage {
  dishId = inject(ActivatedRoute).snapshot.paramMap.get('dishId')!;
  service = inject(DishService);
  dish$ = this.service.getDish(this.dishId);
  discount$ = this.service.getDishDiscount(this.dishId);
}
