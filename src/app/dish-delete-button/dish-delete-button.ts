import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dish-delete-button',
  templateUrl: './dish-delete-button.html',
})
export class DishDeleteButton {
  @Output() delete = new EventEmitter<void>();

  deleteDish() {
    this.delete.emit();
  }
}
