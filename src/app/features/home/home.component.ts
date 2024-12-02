import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="mt-16 w-full" style="height: calc(100vh - 4rem)">
      <div class="p-8 md:p-12 lg:p-16 flex h-full w-full flex-col lg:flex-row">
        <div
          class="card bg-base-300 rounded-box grid flex-grow place-items-center">
          Detecção
        </div>
        <div class="divider divider-horizontal"></div>
        <div
          class="card bg-base-300 rounded-box grid flex-grow place-items-center">
          Utilitários
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
