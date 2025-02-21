import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationComponent {}
