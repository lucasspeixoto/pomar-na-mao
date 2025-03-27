import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObservationDataService } from '../../services/observation-data/observation-data.service';
import {
  createCollectObservationDataForm,
  CollectObservationDataFormValue,
} from '../../../../features/collect/constants/collect-observation-data-form';

@Component({
  selector: 'app-observation-data',
  imports: [
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzDatePickerModule,
    NzFormModule,
    NzCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './observation-data.component.html',
  styleUrls: ['./observation-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationDataComponent implements OnInit {
  public observationDataService = inject(ObservationDataService);

  public notificationService = inject(NzNotificationService);

  public collectObservationDataForm = createCollectObservationDataForm();

  public ngOnInit(): void {
    const observationData = this.observationDataService.getCollectObservationDataFormValue();

    if (observationData) {
      this.collectObservationDataForm.patchValue(observationData);
    }
  }

  public saveObservationCollectDataHandler(): void {
    const observationData = {
      ...this.collectObservationDataForm.value,
    } as CollectObservationDataFormValue;

    this.observationDataService.setCollectObservationDataFormValue(observationData);

    this.notificationService.success('Success', 'Dados de observação salvos com sucesso!');
  }
}
