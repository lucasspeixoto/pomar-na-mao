import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar-services',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink],
  template: `
    <p-toolbar
      [style]="{
        'border-radius': '3rem',
        padding: '0.5rem',
        'background-color': '#ddd',
      }">
      <div class="flex w-full justify-between items-center mx-4 gap-2">
        <!-- Coletar -->
        <div routerLink="/coleta-offline" class="cursor-pointer flex flex-col items-center gap-2">
          <i class="pi pi-box text-green-900 hover:font-extrabold" style="font-size: 1.2rem"></i>
          <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950">Coletar</span>
        </div>
        <!-- Detectar -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i class="pi pi-wifi text-green-900 hover:font-extrabold" style="font-size: 1.2rem"></i>
          <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950">Detectar</span>
        </div>
        <!-- Coletas -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          <i
            class="pi pi-database text-green-900 hover:font-extrabold"
            style="font-size: 1.2rem"></i>
          <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950">Consutar</span>
        </div>
      </div>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarServicesComponent {}
