import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public isVisible = signal(false);

  public title = signal<string | null>(null);

  public message = signal<string | null>(null);

  public type = signal<'success' | 'error' | 'warn' | 'info'>('info');

  public show(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warn' | 'info' = 'info'
  ): void {
    this.title.set(title);
    this.message.set(message);
    this.type.set(type);
    this.isVisible.set(true);
  }

  public hide(): void {
    this.isVisible.set(false);
  }
}
