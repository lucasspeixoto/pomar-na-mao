/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstallPwaServiceService {
  private deferredPrompt: any;
  private promptEvent = new BehaviorSubject<any>(null);
  private isiOS = false;
  private isSafari = false;

  constructor() {
    this.detectPlatform();
    this.setupEventListeners();
  }

  get promptEvent$(): Observable<any> {
    return this.promptEvent.asObservable();
  }

  get isiOSDevice(): boolean {
    return this.isiOS;
  }

  get isSafariBrowser(): boolean {
    return this.isSafari;
  }

  private detectPlatform(): void {
    // Detect iOS devices
    this.isiOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

    // Detect Safari browser (including Chrome on iOS)
    this.isSafari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      navigator.userAgent.indexOf('CriOS') > -1;
  }

  private setupEventListeners(): void {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.promptEvent.next(e);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.promptEvent.next(null);
    });
  }

  public showInstallPrompt(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
          const accepted = choiceResult.outcome === 'accepted';
          if (accepted) {
            console.log('User accepted install prompt');
          } else {
            console.log('User dismissed install prompt');
          }
          this.deferredPrompt = null;
          this.promptEvent.next(null);
          resolve(accepted);
        });
      } else {
        resolve(false);
      }
    });
  }

  public shouldShowInstallButton(): boolean {
    const isStandalone = this.isInStandaloneMode();
    return this.deferredPrompt !== null || (this.isiOS && this.isSafari && !isStandalone);
  }

  public isInStandaloneMode(): boolean {
    return 'standalone' in window.navigator && (window.navigator['standalone'] as boolean);
  }
}
