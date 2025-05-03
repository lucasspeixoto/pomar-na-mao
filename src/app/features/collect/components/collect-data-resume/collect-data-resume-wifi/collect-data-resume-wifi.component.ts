import { ConnectivityService } from '../../../../../services/connectivity/connectivity.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-collect-data-resume-wifi',
  imports: [],
  template: `
    <div
      class="card mb-0 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(132,204,22,0.35)]">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4 text-md md:text-xl">Conexão</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-sm md:text-lg">
            @if (connectivityService.isOnline()) {
              Ativa
            } @else {
              Não ativa
            }
          </div>
        </div>
        <div
          class="size-[1.5rem] sm:size-[2.5rem] flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border">
          <i class="pi pi-wifi text-yellow-500 !text-md md:!text-lg"></i>
        </div>
      </div>

      <span class="text-yellow-400 text-sm md:text-md font-medium">
        @if (connectivityService.isOnline()) {
          Online
        } @else {
          Offline
        }
      </span>
    </div>
  `,
})
export class CollectDataResumeWifiComponent {
  public connectivityService = inject(ConnectivityService);
}
