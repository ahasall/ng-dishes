import { booleanAttribute, Component, EventEmitter, input, Input, model, output, Output } from '@angular/core';

@Component({
  selector: 'app-dish-favorite',
  templateUrl: './dish-favorite.component.html',
})
export class DishFavoriteComponent {
  // favorite = input(false, {transform: booleanAttribute});
  // favoriteChange = output<boolean>();
  favorite = model(false)

  toggle() {
    this.favorite.set(!this.favorite());
    // alternative : this.favorite.update((curr) => !curr);
    // this.favoriteChange.emit(this.favorite()); -- pas besoin avec le = model
  }
}
