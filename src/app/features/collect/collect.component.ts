import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlantUploadComponent } from './components/plant-upload/plant-upload.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ComplementDataComponent } from './components/complement-data/complement-data.component';

const ZORRO = [NzGridModule];

const COMPONENTS = [PlantUploadComponent, GeolocationComponent, ComplementDataComponent];

@Component({
  selector: 'app-collect',
  imports: [...COMPONENTS, ...ZORRO],
  templateUrl: './collect.component.html',
  styleUrl: './collect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectComponent {}
