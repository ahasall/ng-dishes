import { Component, model } from '@angular/core';

@Component({
  selector: 'app-dish-favorite',
  templateUrl: './dish-favorite.component.html',
})
export class DishFavoriteComponent {
  favorite = model.required<boolean>();

  toggle() {
    this.favorite.update((value) => !value);
  }
}
