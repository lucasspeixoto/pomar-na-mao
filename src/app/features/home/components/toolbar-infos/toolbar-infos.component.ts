import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar-infos',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink],
  template: `
    <p-toolbar
      [style]="{
        'border-radius': '3rem',
        padding: '0.5rem',
        'background-color': 'var(--primary-color)',
      }">
      <div class="flex w-full justify-between items-center mx-4 gap-2">
        <!-- Coletar -->
        <div routerLink="/coleta-offline" class="cursor-pointer flex flex-col items-center gap-2">
          <i
            class="pi pi-box opacity-80 hover:opacity-100"
            style="font-size: 1.2rem; color: green"></i>
          <span class="hover:underline font-medium text-gray-950">Coletar</span>
        </div>
        <!-- Detectar -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i
            class="pi pi-wifi opacity-80 hover:opacity-100"
            style="font-size: 1.2rem; color: green"></i>
          <span class="hover:underline font-medium text-gray-950">Detectar</span>
        </div>
        <!-- Coletas -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i
            class="pi pi-database opacity-80 hover:opacity-100"
            style="font-size: 1.2rem; color: green"></i>
          <span class="hover:underline font-medium text-gray-950">Consutar</span>
        </div>
      </div>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .container {
        position: fixed;
        top: 12px;
        right: -8px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 1000;
      }
    `,
  ],
})
export class ToolbarInfosComponent {}
