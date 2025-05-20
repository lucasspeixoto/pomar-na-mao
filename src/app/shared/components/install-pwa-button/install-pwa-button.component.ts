import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InstallPwaServiceService } from 'src/app/shared/services/install-pwa/install-pwa-service.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-install-pwa-button',
  imports: [NgIf, ButtonModule, TooltipModule, DialogModule],
  templateUrl: './install-pwa-button.component.html',
  styleUrl: './install-pwa-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallPwaButtonComponent implements OnInit {
  public showButton = false;

  public showiOSInstructions = false;

  public pwaService = inject(InstallPwaServiceService);

  public ngOnInit(): void {
    this.pwaService.promptEvent$.subscribe(() => {
      this.updateButtonVisibility();
    });

    // Initial check
    this.updateButtonVisibility();
  }

  private updateButtonVisibility(): void {
    const isStandalone = this.pwaService.isInStandaloneMode();
    this.showButton = !isStandalone && this.pwaService.shouldShowInstallButton();
  }

  public async addToHomeScreen(): Promise<void> {
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
