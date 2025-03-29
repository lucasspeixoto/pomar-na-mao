import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ComplementDataComponent } from '../../../collect/components/complement-data/complement-data.component';
import { PlantUploadComponent } from '../../../collect/components/plant-upload/plant-upload.component';
import { CollectService } from '../../../collect/services/collect/collect.service';
import { ObservationDataComponent } from '../../../collect/components/observation-data/observation-data.component';
import { GeolocationComponent } from '../../../../shared/components/geolocation/geolocation.component';
import { CollectStepService } from '../../services/collect-step/collect-step.service';

const ZORRO = [
  NzDividerModule,
  NzStepsModule,
  NzGridModule,
  NzButtonModule,
  NzCardModule,
  NzAlertModule,
  NzIconModule,
];

const COMPONENTS = [
  PlantUploadComponent,
  ComplementDataComponent,
  ObservationDataComponent,
  GeolocationComponent,
];

@Component({
  selector: 'app-collect',
  imports: [...COMPONENTS, ...ZORRO],
  templateUrl: './collect.component.html',
  styleUrl: './collect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectComponent {
  private collectService = inject(CollectService);

  private collectStepService = inject(CollectStepService);

  public router = inject(Router);

  public collectStep = this.collectStepService.getCollectStep();

  public collectMobileSteps = this.collectStepService.getCollectMobileSteps();

  public collectDesktopSteps = this.collectStepService.getCollectDesktopSteps();

  public onCollectStepChange(collectStep: number): void {
    this.collectStepService.setCollectStep(collectStep);
  }

  public collectHandler(): void {
    this.collectService.insertAPlantCollectHandler();
  }
}
