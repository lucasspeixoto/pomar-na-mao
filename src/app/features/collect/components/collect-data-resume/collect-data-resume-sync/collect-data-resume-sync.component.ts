import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IndexDbCollectService } from 'src/app/services/index-db/index-db-collect.service';

@Component({
  selector: 'app-collect-data-resume-sync',
  imports: [AsyncPipe],
  template: `
    <section
      class="card mb-0 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(132,204,22,0.35)]">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4 text-md md:text-xl"
            >Sincronizar</span
          >

          @if (collectedData$ | async) {
            <div class="text-green-600 dark:text-green-0 font-medium text-sm md:text-lg">
              Total: {{ indexDbCollectService.totalCollectedData() }}
            </div>
          }
        </div>
        <div
          class="size-[1.5rem] sm:size-[2.5rem] flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border">
          <i class="pi pi-sync text-blue-500 !text-md md:!text-lg"></i>
        </div>
      </div>
      <span class="text-sm md:text-md text-purple-400 hover:cursor-pointer hover:underline">
        <a routerLink="/inicio/coleta/sincronizar">Acessar</a>
        <i style="font-size: 0.8rem" class="ml-2 pi pi-external-link"></i>
      </span>
    </section>
  `,
  styles: [
    `
      .card {
        padding: 2rem 0.8rem;

        @media (max-width: 400px) {
          padding: 0.8rem;
        }
      }
    `,
  ],
})
export class CollectDataResumeSyncComponent {
  public indexDbCollectService = inject(IndexDbCollectService);

  public collectedData$ = this.indexDbCollectService.listAllCollects();

  public collectedData = this.indexDbCollectService.collectedData;

  public totalCollectedData = this.indexDbCollectService.totalCollectedData;
}
