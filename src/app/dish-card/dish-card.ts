import { Component, input, output } from '@angular/core';
import { Dish } from '../dish';
import { DishFavoriteButton } from '../dish-favorite-button/dish-favorite-button';
import { DishDeleteButton } from '../dish-delete-button/dish-delete-button';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.html',
  imports: [DishFavoriteButton, DishDeleteButton],
  host: {
    class: 'wma-card',
  },
})
export class DishCard {
  $dish = input.required<Dish>({
    alias: 'dish'
  });
  delete = output<string>();
  like = output();
  unlike = output();

  deleteDish(dishId: string) {
    this.delete.emit(dishId);
  }

  onFavoriteChange(liked: boolean) {
    if (liked) {
      this.like.emit();
    } else {
      this.unlike.emit();
    }
  }
}
