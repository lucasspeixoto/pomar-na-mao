import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<div class="layout-footer">
    <span class="font-semibold"> © {{ year }} Pomar na mão™ | Sua fazenda na palma da mão. </span>
  </div>`,
})
export class AppFooterComponent {
  public year: number = new Date().getFullYear();
}
