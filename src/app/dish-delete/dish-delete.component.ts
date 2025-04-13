import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dish-delete',
  templateUrl: './dish-delete.component.html',
})
export class DishDeleteComponent {
  @Output() delete = new EventEmitter<void>();

  deleteDish() {
    this.delete.emit();
  }
}
