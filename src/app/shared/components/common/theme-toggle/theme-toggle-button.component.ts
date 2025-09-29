import { Component } from '@angular/core';
import { ThemeService, type Theme } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  imports: [CommonModule],
})
export class ThemeToggleButtonComponent {
  public theme$!: Observable<Theme>;

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.theme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
