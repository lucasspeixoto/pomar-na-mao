import { Component, inject } from '@angular/core';
import { LoadingService } from '../../shared/services/loading-store.service';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    @if (loadingStore.isLoading()) {
      <div class="loading-overlay bg-[#E0E0E0] dark:bg-[#101828] opacity-80">
        <div
          class="loader mb-4 border-8 border-t-8 border-brand-200 dark:border-brand-700 border-t-brand-500 dark:border-t-brand-300 rounded-full w-16 h-16 animate-spin"></div>
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
export class LoadingComponent {
  public loadingStore = inject(LoadingService);
}
