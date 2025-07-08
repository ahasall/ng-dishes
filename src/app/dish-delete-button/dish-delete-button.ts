import { Component, output } from '@angular/core';

@Component({
  selector: 'app-dish-delete-button',
  templateUrl: './dish-delete-button.html',
})
export class DishDeleteButton {
  delete = output();

  deleteDish() {
    this.delete.emit();
  }
}
