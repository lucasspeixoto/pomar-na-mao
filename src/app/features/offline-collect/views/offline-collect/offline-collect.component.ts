import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ComplementDataComponent } from '../../../../shared/components/complement-data/complement-data.component';
import { PlantUploadComponent } from '../../../../shared/components/plant-upload/plant-upload.component';
import { CollectService } from '../../../collect/services/collect/collect.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { OfflineCollectStatisticsComponent } from '../../components/offline-collect-statistics/offline-collect-statistics.component';
import { Router } from '@angular/router';

const ZORRO = [NzGridModule, NzButtonModule, NzCardModule];

const COMPONENTS = [
  OfflineCollectStatisticsComponent,
  PlantUploadComponent,
  ComplementDataComponent,
];

@Component({
  selector: 'app-offline-collect',
  imports: [...COMPONENTS, ...ZORRO],
  templateUrl: './offline-collect.component.html',
  styleUrls: ['./offline-collect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineCollectComponent {
  private collectService = inject(CollectService);

  public router = inject(Router);

  public collectHandler(): void {
    this.collectService.insertAPlantCollectHandler();
  }
}
