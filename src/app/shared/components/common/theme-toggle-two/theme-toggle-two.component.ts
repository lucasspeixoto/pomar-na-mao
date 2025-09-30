import { Component, inject } from '@angular/core';
import { ThemeService, type Theme } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle-two',
  imports: [CommonModule],
  templateUrl: './theme-toggle-two.component.html',
  styles: ``,
})
export class ThemeToggleTwoComponent {
  private themeService = inject(ThemeService);

  public theme$!: Observable<Theme>;

  constructor() {
    this.theme$ = this.themeService.theme$;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
