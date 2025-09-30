import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backdrop',
  imports: [CommonModule],
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  private sidebarService = inject(SidebarService);

  readonly isMobileOpen$;

  constructor() {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  closeSidebar(): void {
    this.sidebarService.setMobileOpen(false);
  }
}
