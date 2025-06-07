import { Component, inject } from '@angular/core';
import { LoadingStore } from '@sharedS/loading-store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  template: `
    @if (loadingStore.isLoading()) {
      <div class="loading-overlay bg-[#E0E0E0] dark:bg-[#121212] opacity-80">
        <p-progress-spinner
          ariaLabel="loading"
          strokeWidth="8"
          fill="transparent"
          animationDuration="1s"
          styleClass="text-primary"
          [style]="{ width: '70px', height: '70px' }" />

        <p class="font-semibold text-lg my-4">
          {{ loadingStore.message() }}<span class="animate animate-pulse">...</span>
        </p>
      </div>
    }
  `,
  styles: `
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      z-index: 9999;
    }
  `,
})
export class Loading {
  public loadingStore = inject(LoadingStore);
}
