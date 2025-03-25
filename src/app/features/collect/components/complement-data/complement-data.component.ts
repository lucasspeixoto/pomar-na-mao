import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  createCollectComplementDataForm,
  CollectComplementDataFormValue,
} from '../../constants/collect-complement-data-form';
import { CustomValidationMessageComponent } from '../../../../shared/components/custom-validation-message/custom-validation-message';
import { ComplementDataService } from '../../services/complement-data/complement-data.service';
import { CollectService } from '../../services/collect/collect.service';

@Component({
  selector: 'app-complement-data',
  imports: [
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzDatePickerModule,
    NzFormModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
  ],
  templateUrl: './complement-data.component.html',
  styleUrls: ['./complement-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementDataComponent {
  public complementDataService = inject(ComplementDataService);

  public notificationService = inject(NzNotificationService);

  public collectService = inject(CollectService);

  public collectComplementDataForm = createCollectComplementDataForm();

  public saveComplementCollectDataHandler(): void {
    const complementData = {
      ...this.collectComplementDataForm.value,
    } as CollectComplementDataFormValue;

    this.complementDataService.setCollectComplementDataFormValue(complementData);

    this.notificationService.success('Success', 'Dados complementares salvos com sucesso!');

    setTimeout(() => {
      this.collectService.collectStep.set(3);
    }, 1000);
  }
}
