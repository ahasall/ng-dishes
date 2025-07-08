import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) dish!: Dish;
  @Output() delete = new EventEmitter<string>();
  @Output() like = new EventEmitter();
  @Output() unlike = new EventEmitter();

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
