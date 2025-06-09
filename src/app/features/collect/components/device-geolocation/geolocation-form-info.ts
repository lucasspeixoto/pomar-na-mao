import { Component } from '@angular/core';
import { GEOLOCATION_INFO_TEXT } from '@collectCs/texts';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-geolocation-form-info',
  imports: [CardModule, MessageModule, ButtonModule],
  template: `
    <p-message severity="info">
      <div class="flex flex-col gap-1">
        <span class="text-md text-justify font-semibold">{{ geolocationTextInfo }}</span>
        <p-button
          (click)="reloadPage()"
          class="mt-4 self-end flex items-center justify-center opacity-80 hover:opacicy-100">
          <span>Reposicionar</span>
          <img width="20px" height="20px" alt="Mapa" src="assets/images/map.png" />
        </p-button>
      </div>
    </p-message>
  `,
  styles: [
    `
      .card {
        padding: 1rem;

        @media (max-width: 768px) {
          padding: 8px 5px;
        }
      }
    `,
  ],
})
export class GeolocationFormInfo {
  public geolocationTextInfo = GEOLOCATION_INFO_TEXT;

  public reloadPage(): void {
    window.location.reload();
  }
}
