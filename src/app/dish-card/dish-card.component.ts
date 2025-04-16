import { Component, input, output } from '@angular/core';
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
  $dish = input.required<Dish>({
    alias: 'dish',
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
