import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = signal(false);

  public isLoading = this._isLoading.asReadonly();

  private _message = signal('Carregando');

  public message = this._message.asReadonly();

  public resetMessage(): void {
    this._message.set('Carregando');
  }

  public setMessage(message: string): void {
    this._message.set(message);
  }

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }
}
