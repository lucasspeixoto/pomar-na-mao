import { Component } from '@angular/core';
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
  public theme$!: Observable<Theme>;

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.theme$;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
