import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dish-favorite',
  templateUrl: './dish-favorite.component.html',
})
export class DishFavoriteComponent {
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();

  toggle() {
    this.favorite = !this.favorite;
    this.favoriteChange.emit(this.favorite);
  }
}
