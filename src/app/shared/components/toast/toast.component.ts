import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @let title = toastService.title();
    @let message = toastService.message();
    @let type = toastService.type();

    @if (toastService.isVisible()) {
      <div class="fixed top-4 right-4 z-999999 flex flex-col gap-3">
        <div
          class="pointer-events-auto w-90 rounded-xl border border-transparent py-4 px-2 flex items-start gap-3 animate-slide-in transition-all duration-300"
          [ngClass]="{
            'bg-green-50/70 border-green-200 backdrop-blur-sm dark:bg-green-950/70 dark:border-green-700':
              type === 'success',

            'bg-red-50/70 border-red-200 backdrop-blur-sm dark:bg-red-950/70 dark:border-red-700':
              type === 'error',

            'bg-yellow-50/70 border-yellow-200 backdrop-blur-sm dark:bg-yellow-950/70 dark:border-yellow-700':
              type === 'warn',

            'bg-blue-50/70 border-blue-200 backdrop-blur-sm dark:bg-blue-950/70 dark:border-blue-700':
              type === 'info',
          }">
          <div
            class="flex-shrink-0 mt-0.5"
            [ngClass]="{
              'text-green-600 dark:text-green-400': type === 'success',
              'text-red-600 dark:text-red-400': type === 'error',
              'text-yellow-600 dark:text-yellow-400': type === 'warn',
              'text-blue-600 dark:text-blue-400': type === 'info',
            }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                [attr.d]="
                  type === 'success'
                    ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    : type === 'error'
                      ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      : type === 'warn'
                        ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                " />
            </svg>
          </div>

          <div class="flex-1 text-gray-800 dark:text-gray-200">
            @if (title) {
              <div class="font-bold text-sm leading-snug">{{ title }}</div>
            }
            <div class="text-sm" [class.font-medium]="!title">{{ message }}</div>
          </div>

          <button
            (click)="close()"
            class="ml-2 flex-shrink-0 p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-slide-in {
        animation: slideIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; /* Using a 'back' easing function for a slightly bouncier feel */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  public toastService = inject(ToastService);

  public close(): void {
    this.toastService.hide();
  }
}
