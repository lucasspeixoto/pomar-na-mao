import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InstallPwaManager } from '@sharedS/install-pwa-manager';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-install-pwa-button',
  imports: [NgIf, ButtonModule, TooltipModule, DialogModule],
  template: `
    <div
      *ngIf="showButton"
      (click)="addToHomeScreen()"
      [pTooltip]="pwaService.isiOSDevice ? 'Adicionar ao Inicio' : 'Instalar'"
      tooltipPosition="left"
      class="install-button animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </div>

    <p-dialog
      header="Instalar Pomar na mão 🌳"
      [breakpoints]="{
        '1024px': '40vw',
        '768px': '60vw',
        '550px': '80vw',
        '375px': '95vw',
      }"
      [style]="{ width: '30vw' }"
      [(visible)]="showiOSInstructions"
      [modal]="true"
      [closable]="true"
      (onHide)="closeiOSInstructions()">
      <p>
        Para instalar este aplicativo no seu dispositivo iOS, abra-o no Safari e toque no botão
        <strong>Compartilhar</strong> e selecione <strong>Adicionar à Tela Inicial</strong>.
      </p>
    </p-dialog>
  `,
  styles: [
    `
      /* install-pwa-button.component.css */
      .install-button {
        position: fixed;
        top: 12px;
        right: -8px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 1000;
      }

      /* iOS Instructions Modal */
      .ios-instructions-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
      }

      .modal-content {
        padding: 24px;
        border-radius: 12px;
        max-width: 90%;
        width: 400px;
        text-align: center;
        position: relative;
        animation: slideUp 0.3s ease;
      }

      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }

      .instructions {
        margin: 20px 0;
        text-align: left;
      }

      .step {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .step-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex-shrink: 0;
      }

      .icon {
        font-size: 20px;
        display: inline-block;
        margin-left: 5px;
      }

      .safari-screenshot {
        margin: 20px 0;
        height: 150px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .got-it-button {
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallPwaButton implements OnInit {
  public showButton = false;

  public showiOSInstructions = false;

  public pwaService = inject(InstallPwaManager);

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
