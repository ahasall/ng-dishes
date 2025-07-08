import { Component, model } from '@angular/core';

@Component({
  selector: 'app-dish-favorite-button',
  templateUrl: './dish-favorite-button.html',
})
export class DishFavoriteButton {
  favorite = model.required<boolean>();

  toggle() {
    this.favorite.update((f) => !f);
  }
}
