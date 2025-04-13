import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dish } from '../dish';
import { DishFavoriteComponent } from '../dish-favorite/dish-favorite.component';
import { DishDeleteComponent } from '../dish-delete/dish-delete.component';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  imports: [DishFavoriteComponent, DishDeleteComponent],
  host: {
    class: 'wma-card',
  },
})
export class DishCardComponent {
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
