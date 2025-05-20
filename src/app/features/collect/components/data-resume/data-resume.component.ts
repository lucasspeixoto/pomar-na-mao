import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvailableToSyncComponent } from './available-to-sync/available-to-sync.component';
import { ResumeGeolocationComponent } from './resume-geolocation/resume-geolocation.component';
import { WifiComponent } from './wifi/wifi.component';

const PRIMENG = [ButtonModule];

const COMPONENTS = [WifiComponent, AvailableToSyncComponent, ResumeGeolocationComponent];

@Component({
  selector: 'app-data-resume',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './data-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataResumeComponent {}
