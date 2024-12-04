import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="w-full" style="height: calc(100vh - 4rem)">
      <div class="p-8 md:p-12 lg:p-16 flex h-full w-full flex-col lg:flex-row">
        <div class="bg-base-300 rounded-box grid flex-grow place-items-center">
          Conteúdo 1
        </div>
        <div class="divider divider-horizontal"></div>
        <div
          class="card bg-base-300 rounded-box grid flex-grow place-items-center">
          Conteúdo 2
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
