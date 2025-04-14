import { Component } from '@angular/core';
import { Dish } from '../dish';
import { Discount } from '../discount';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-discount-calculator',
  templateUrl: './dish-discount-calculator.page.html',
  imports: [FormsModule, CurrencyPipe],
  host: {
    class: 'wma-mini-container',
  },
})
export class DishDiscountCalculatorPage {
  dishes: Dish[] = [];
  discounts: Discount[] = [];
  quantity = 1;
  dishId = '';
  dish: Dish | null = null;
  discount: Discount | null = null;

  get subtotal(): number {
    return this.dish ? this.dish.price * this.quantity : 0;
  }

  get discountAmount(): number {
    if (!this.discount) return 0;
    return (this.subtotal * this.discount.percentage) / 100;
  }

  get total(): number {
    return this.subtotal - this.discountAmount;
  }

  onDishChange() {
    this.dish = this.dishes.find((d) => d.id === this.dishId) || null;
    this.quantity = 1;
    this.updateDiscount();
  }

  incrementQuantity() {
    this.quantity++;
    this.updateDiscount();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateDiscount();
    }
  }

  updateDiscount() {
    if (!this.dish) {
      this.discount = null;
    } else {
      this.discount =
        this.discounts.find((d) => d.dishId === this.dish?.id && this.quantity >= d.minQuantity) ||
        null;
    }
  }
}
