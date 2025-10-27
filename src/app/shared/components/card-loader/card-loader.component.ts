import { Component } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  template: `
    <div class="h-full w-full flex justify-center items-center text-center">
      <div
        class="loader mb-4 border-8 border-t-8 border-brand-200 dark:border-brand-700 border-t-brand-500 dark:border-t-brand-300 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  `,
})
export class CardLoaderComponent {}
