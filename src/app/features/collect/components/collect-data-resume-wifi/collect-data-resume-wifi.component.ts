import { ConnectivityService } from './../../../../services/connectivity/connectivity.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-collect-data-resume-wifi',
  imports: [],
  template: `
    <div class="card mb-0">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">Conexão</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            @if (connectivityService.isOnline()) {
              Ativa
            } @else {
              Não ativa
            }
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-wifi text-yellow-500 !text-xl"></i>
        </div>
      </div>

      @if (connectivityService.isOnline()) {
        <span class="text-green-400 font-medium">Online</span>
      } @else {
        <span class="text-red-400 font-medium">Offline</span>
      }
    </div>
  `,
})
export class CollectDataResumeWifiComponent {
  public connectivityService = inject(ConnectivityService);
}
