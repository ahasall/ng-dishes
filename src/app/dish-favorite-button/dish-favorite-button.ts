import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dish-favorite-button',
  templateUrl: './dish-favorite-button.html',
})
export class DishFavoriteButton {
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();

  toggle() {
    this.favorite = !this.favorite;
    this.favoriteChange.emit(this.favorite);
  }
}
