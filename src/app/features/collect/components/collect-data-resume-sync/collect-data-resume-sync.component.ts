import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IndexDbCollectService } from 'src/app/services/index-db/index-db-collect.service';

@Component({
  selector: 'app-collect-data-resume-sync',
  imports: [AsyncPipe],
  template: `
    <section class="card mb-0">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">A Sincronizar</span>

          @if (collectedData$ | async) {
            <div class="text-green-600 dark:text-green-0 font-medium text-xl">
              Total: {{ indexDbCollectService.totalCollectedData() }}
            </div>
          }
        </div>
        <div
          class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-sync text-blue-500 !text-xl"></i>
        </div>
      </div>
      <span class="text-purple-400 hover:underline">
        <a class="text-md" routerLink="/inicio/coleta/sincronizar">Acessar</a>
        <i style="font-size: 0.8rem" class="ml-2 pi pi-external-link"></i>
      </span>
    </section>
  `,
})
export class CollectDataResumeSyncComponent {
  public indexDbCollectService = inject(IndexDbCollectService);

  public collectedData$ = this.indexDbCollectService.listAllCollects();

  public collectedData = this.indexDbCollectService.collectedData;

  public totalCollectedData = this.indexDbCollectService.totalCollectedData;
}
