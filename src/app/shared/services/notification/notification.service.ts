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

  public async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (!this.notificationSupported) {
      console.warn('Sem suporte para notificações!');
      return;
    }

    if (window.Notification.permission === 'granted') {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, options);
      } catch (error) {
        console.warn('Error ao enviar notificação:', error);
        new window.Notification(title, options);
      }
    } else {
      console.warn('Sem permissão para envio de notificações!');
    }
  }

  private get notificationSupported(): boolean {
    return isPlatformBrowser(this.platformId) && 'Notification' in window;
  }
}
