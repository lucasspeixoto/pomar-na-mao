import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenLoaderService {
  private _isLoading = signal(true);

  private _loadingText = signal<string>('Carregando...');

  public setLoading(isLoading: boolean): void {
    this._isLoading.set(isLoading);
  }

  public get isLoading(): boolean {
    return this._isLoading();
  }

  public setLoadingText(loadingText: string): void {
    this._loadingText.set(loadingText);
  }

  public get loadingText(): string {
    return this._loadingText();
  }
}
