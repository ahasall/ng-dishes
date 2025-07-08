import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  host: { class: 'flex w-full flex-col items-center space-y-4 sm:items-end' },
})
export class Toast {
  message = '';
}
