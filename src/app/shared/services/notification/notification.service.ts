import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private platformId = inject(PLATFORM_ID);

  public requestPermission(): Promise<NotificationPermission> {
    if (!this.notificationSupported) return Promise.reject('Sem suporte para notificações!');

    return window.Notification.requestPermission();
  }

  public showNotification(title: string, options?: NotificationOptions): void {
    if (!this.notificationSupported) {
      console.warn('Notification not supported!');

      return;
    }

    if (window.Notification.permission === 'granted') {
      new window.Notification(title, options);
    } else {
      console.warn('Notification not supported!');
    }
  }

  private get notificationSupported(): boolean {
    return isPlatformBrowser(this.platformId) && 'Notification' in window;
  }
}
