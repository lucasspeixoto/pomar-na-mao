import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private platformId = inject(PLATFORM_ID);

  private isBrowser = isPlatformBrowser(this.platformId);

  private _isOnline = signal<boolean>(this.isBrowser ? navigator.onLine : true);

  constructor() {
    if (this.isBrowser) {
      window.addEventListener('online', () => this.isOnline.set(true));
      window.addEventListener('offline', () => this.isOnline.set(false));
    }
  }

  get isOnline(): WritableSignal<boolean> {
    return this._isOnline;
  }
}
