import { CollectFormService } from './../../services/collect-form.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';

@Component({
  selector: 'app-geolocation',
  imports: [
    FormsModule,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzSwitchModule,
    NzSkeletonModule,
  ],
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationComponent implements OnInit {
  public geolocationService = inject(GeolocationService);

  public collectFormService = inject(CollectFormService);

  public ngOnInit(): void {
    this.loadGeolocationData();
  }

  public loadGeolocationData(): void {
    this.geolocationService.getLocaltionPermission();
    this.geolocationService.getLocaltionCoordinate();
  }
}
