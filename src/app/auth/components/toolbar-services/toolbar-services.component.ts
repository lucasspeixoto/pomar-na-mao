import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar-services',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink],
  template: `
    <p-toolbar [style]="{ 'border-radius': '3rem', padding: '0.5rem' }">
      <div class="flex w-full justify-between items-center mx-4 gap-2">
        <!-- Coletar -->
        <div routerLink="/coleta-offline" class="cursor-pointer flex flex-col items-center gap-2">
          <i class="pi pi-box opacity-80 hover:opacity-100" style="color: rgb(58, 222, 58)"></i>
          <span class="hover:underline">Coletar</span>
        </div>
        <!-- Detectar -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i class="pi pi-wifi opacity-80 hover:opacity-100" style="color: rgb(58, 222, 58)"></i>
          <span class="hover:underline">Detectar</span>
        </div>
        <!-- Coletas -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i
            class="pi pi-database opacity-80 hover:opacity-100"
            style="color: rgb(58, 222, 58)"></i>
          <span class="hover:underline">Consutar</span>
        </div>
      </div>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarServicesComponent {}
