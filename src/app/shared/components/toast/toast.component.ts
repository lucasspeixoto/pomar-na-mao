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
          class="pointer-events-auto w-72 rounded-lg shadow-md  border-1 bg-white dark:bg-gray-900 px-4 py-3 flex items-start gap-3 animate-slide-in"
          [ngClass]="{
            'shadow-brand-200 text-brand-500': type === 'success',
            'shadow-error-200 text-error-500': type === 'error',
            'shadow-yellow-200 text-yellow-500': type === 'warn',
            'shadow-slate-200 text-slate-500': type === 'info',
          }">
          <div class="flex-1">
            @if (title) {
              <div class="font-semibold text-sm">{{ title }}</div>
            }
            <div class="text-sm">{{ message }}</div>
          </div>

          <!-- Botão fechar -->
          <button (click)="close()" class="ml-2 text-slate-500 hover:text-slate-700">
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
        animation: slideIn 0.3s ease-out;
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
