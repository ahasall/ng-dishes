import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  host: {
    class: 'block',
  },
  templateUrl: './error.component.html',
})
export class ErrorComponent {}
