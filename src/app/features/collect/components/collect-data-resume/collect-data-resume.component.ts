import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CollectDataResumeSyncComponent } from './collect-data-resume-sync/collect-data-resume-sync.component';
import { CollectDataResumeGeolocationComponent } from './collect-data-resume-geolocation/collect-data-resume-geolocation.component';
import { CollectDataResumeWifiComponent } from './collect-data-resume-wifi/collect-data-resume-wifi.component';

const PRIMENG = [ButtonModule];

const COMPONENTS = [
  CollectDataResumeWifiComponent,
  CollectDataResumeSyncComponent,
  CollectDataResumeGeolocationComponent,
];

@Component({
  selector: 'app-collect-data-resume',
  imports: [...PRIMENG, ...COMPONENTS],
  templateUrl: './collect-data-resume.component.html',
})
export class CollectDataResumeComponent {}
