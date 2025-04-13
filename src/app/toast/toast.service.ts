import { inject, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from './toast.component';

// Code à ne pas utiliser en production
@Injectable({ providedIn: 'root' })
export class ToastService {
  private overlay = inject(Overlay);

  error(message: string, duration = 2000) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().bottom('2rem').right('2rem'),
      panelClass: ['w-full', 'pointer-events-none'],
    });

    const toastPortal = new ComponentPortal(ToastComponent);
    const componentRef = overlayRef.attach(toastPortal);

    componentRef.instance.message = message;

    setTimeout(() => {
      overlayRef.dispose();
    }, duration);
  }
}
