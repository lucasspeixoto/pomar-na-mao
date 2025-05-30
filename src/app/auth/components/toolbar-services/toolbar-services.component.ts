import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';

@Component({
  selector: 'app-toolbar-services',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink],
  template: `
    @let isOnline = connectivityService.isOnline();

    <p-toolbar
      [style]="{
        'border-radius': '3rem',
        padding: '0.5rem 0.2rem',
        'background-color': '#ddd',
      }">
      <div class="flex w-full justify-evenly items-center mx-4 gap-2">
        <!-- Coletar -->
        <div
          routerLink="/coleta-offline"
          class="cursor-pointer flex flex-col justify-center items-center gap-2">
          <!-- <i class="pi pi-box text-green-900 hover:font-extrabold" style="font-size: 1.2rem"></i> -->
          <img width="25px" height="25px" src="/assets/images/open-box.png" alt="Caixa de coleta" />
          <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950"
            >Coleta Offline</span
          >
        </div>
        <!-- Detectar -->
        <div class="cursor-pointer flex flex-col items-center gap-2">
          @if (isOnline) {
            <img width="25px" height="25px" src="assets/images/online.png" alt="Online logo" />
            <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950">Online</span>
          } @else {
            <img width="25px" height="25px" src="assets/images/offline.png" alt="Offline logo" />
            <span class="hover:underline text-xs sm:text-sm md:text-md text-gray-950">Offline</span>
          }
        </div>
      </div>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarServicesComponent {
  public connectivityService = inject(ConnectivityService);
}
