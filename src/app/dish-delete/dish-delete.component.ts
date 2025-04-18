import { Component, EventEmitter, output, Output } from '@angular/core';

@Component({
  selector: 'app-dish-delete',
  templateUrl: './dish-delete.component.html',
})
export class DishDeleteComponent {
 delete = output<void>();

  deleteDish() {
    this.delete.emit();
  }
}
