import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScreenLoaderService } from '../../services/screen-loader/screen-loader.service';

@Component({
  selector: 'app-screen-loader',
  imports: [],
  template: `
    @if (screenLoaderService.isLoading) {
      <div
        class="fixed z-[9999] bg-base-200 flex justify-center items-center w-full h-screen">
        <div class="flex flex-col items-center justify-center">
          <span class="loading loading-spinner loading-lg text-primary"></span>

          <span>
            {{ screenLoaderService.loadingText }}
          </span>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenLoaderComponent {
  public screenLoaderService = inject(ScreenLoaderService);
}
