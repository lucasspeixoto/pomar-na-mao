import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

const LOCAL_STORAGE_KEY = 'POMAR_NA_MAO:THEME';

type ColorThemeT = 'forest' | 'pastel';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _document = inject(DOCUMENT);

  public isCurrentThemeDark = signal(false);

  public getPreferredColorTheme(): ColorThemeT {
    const storedTheme = this._getStoredTheme();

    return storedTheme ? storedTheme : 'forest';
  }

  private _getStoredTheme(): ColorThemeT | void {
    if (typeof localStorage === 'undefined') return;

    const storedThemeObject = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}';

    const parsedStoredThemeObject = JSON.parse(storedThemeObject);

    return parsedStoredThemeObject.colorTheme;
  }

  private _setStoredColorTheme(colorTheme: ColorThemeT): void {
    if (typeof localStorage === 'undefined') return;

    const storedThemeObject: { colorTheme: ColorThemeT } = { colorTheme };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedThemeObject));
  }

  public setColorTheme(colorTheme: ColorThemeT): void {
    const isCurrentThemeDark = colorTheme === 'forest' ? true : false;

    this.isCurrentThemeDark.set(isCurrentThemeDark);

    this._setElementAttribute(colorTheme);
  }

  private _setElementAttribute(theme: string): void {
    this._document.querySelector('body')?.setAttribute('data-theme', theme);
  }

  public toggleColorTheme(): void {
    const currentColorTheme = this.isCurrentThemeDark() ? 'pastel' : 'forest';

    this.setColorTheme(currentColorTheme);
    this._setStoredColorTheme(currentColorTheme);
  }
}
