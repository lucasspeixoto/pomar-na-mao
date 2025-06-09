import { Component, inject } from '@angular/core';
import { GeolocationNavigator } from '@collectS/geolocation-navigator';
import { EpochToTimePipe } from '@sharedPp/epoch-to-time-pipe';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-device-geolocation-web-infos',
  imports: [CardModule, EpochToTimePipe],
  template: `
    <section>
      @let coordinates = geolocationNavigator.coordinates();
      @let gpsTimestamp = geolocationNavigator.coordinatesTimestamp();

      <p-card header="Coordenadas">
        <div class="mt-2 flex flex-col items-start gap-8">
          <span class="font-semibold"
            >Latitude:
            <strong id="latitude" class="text-primary">{{ coordinates?.latitude }} </strong>
          </span>

          <span class="font-semibold"
            >Longitude:
            <strong id="longitude" class="text-primary">{{ coordinates?.longitude }} </strong>
          </span>

          <span class="font-semibold"
            >Tempo:
            <strong id="timestamp" class="text-primary">{{ gpsTimestamp! | epochToTime }} </strong>
          </span>
        </div>
      </p-card>
    </section>
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
export class DeviceGeolocationWebInfos {
  public geolocationNavigator = inject(GeolocationNavigator);
}
