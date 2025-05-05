import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InstallPwaServiceService } from 'src/app/services/install-pwa/install-pwa-service.service';

@Component({
  selector: 'app-install-pwa-button',
  imports: [NgIf, ButtonModule],
  templateUrl: './install-pwa-button.component.html',
  styleUrl: './install-pwa-button.component.scss',
})
export class InstallPwaButtonComponent implements OnInit {
  showButton = false;
  showiOSInstructions = false;

  public pwaService = inject(InstallPwaServiceService);

  public ngOnInit(): void {
    this.pwaService.promptEvent$.subscribe(() => {
      this.showButton = this.pwaService.shouldShowInstallButton();
    });

    // Initial check
    this.showButton = this.pwaService.shouldShowInstallButton();
  }

  async addToHomeScreen(): Promise<void> {
    if (this.pwaService.isiOSDevice && this.pwaService.isSafariBrowser) {
      this.showiOSInstructions = true;
    } else {
      await this.pwaService.showInstallPrompt();
    }
  }

  public closeiOSInstructions(): void {
    this.showiOSInstructions = false;
  }
}
