import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<div class="layout-footer">
    <span class="font-semibold text-xs sm:text-sm md:text-md lg:text-base">
      © {{ year }} Pomar na mão™ | Sua fazenda a um palmo.
    </span>
  </div>`,
})
export class AppFooterComponent {
  public year: number = new Date().getFullYear();
}
