import { Component, inject } from '@angular/core';
import { GeolocationNavigator } from '@collectS/geolocation-navigator';
import { EpochToTimePipe } from '@sharedPp/epoch-to-time-pipe';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-device-geolocation-mobile-infos',
  imports: [CardModule, EpochToTimePipe],
  template: `
    <section class="inline-block md:hidden my-2 w-full">
      @let coordinates = geolocationNavigator.coordinates();
      @let gpsTimestamp = geolocationNavigator.coordinatesTimestamp();
      <div
        class="card z-50 bg-surface-50 rounded-xl shadow-lg py-4 px-8 flex justify-between items-center font-medium">
        <div class="text-md flex flex-col justify-center items-center gap-2">
          <span>Latitude</span>
          <span>{{ coordinates?.latitude }}</span>
        </div>
        <div class="text-md flex flex-col justify-center items-center gap-2">
          <span>Tempo</span>
          <span>{{ gpsTimestamp! | epochToTime }}</span>
        </div>
        <div class="text-md flex flex-col justify-center items-center gap-2">
          <span>Longitude</span>
          <span>{{ coordinates?.longitude }}</span>
        </div>
      </div>
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
export class DeviceGeolocationMobileInfos {
  public geolocationNavigator = inject(GeolocationNavigator);
}
