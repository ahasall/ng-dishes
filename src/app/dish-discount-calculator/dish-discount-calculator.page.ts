import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Dish } from '../dish';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-discount-calculator',
  templateUrl: './dish-discount-calculator.page.html',
  imports: [FormsModule, CurrencyPipe],
  host: {
    class: 'wma-mini-container',
  },
})
export class DishDiscountCalculatorPage {
  service = inject(DishService);
  dishes = httpResource<Dish[]>('/api/dishes', {
    defaultValue: [],
  });

  dishId = signal('');
  $dish = computed(() => {
    return this.dishes.value().find((d) => d.id === this.dishId()) || null;
  });
  quantity = linkedSignal({
    source: () => this.dishId(),
    computation: () => 1,
  });
  discountResource = rxResource({
    request: () => ({
      id: this.dishId(),
    }),
    loader: ({ request }) => {
      return this.service.getDishDiscount(request.id);
    },
  });
  $discount = computed(() => {
    return this.discountResource.value() || null;
  });

  subtotal = computed(() => {
    const dish = this.$dish();
    return dish ? dish.price * this.quantity() : 0;
  });

  discountAmount = computed(() => {
    let discount = this.$discount();
    if (!discount) return 0;
    return (this.subtotal() * discount.percentage) / 100;
  });

  total = computed(() => {
    return this.subtotal() - this.discountAmount();
  });

  incrementQuantity() {
    this.quantity.update((q) => q + 1);
  }

  decrementQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }
}
