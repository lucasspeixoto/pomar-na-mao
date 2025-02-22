import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  createCollectComplementDataForm,
  type CollectComplementDataFormValue,
} from '../../constants/collect-complement-data-form';
import { CustomValidationMessageComponent } from '../../../../shared/components/custom-validation-message/custom-validation-message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
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
    ReactiveFormsModule,
    CustomValidationMessageComponent,
  ],
  templateUrl: './complement-data.component.html',
  styleUrls: ['./complement-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementDataComponent {
  public collectService = inject(CollectService);

  public collectComplementDataForm = createCollectComplementDataForm();

  public collectDataHandler(): void {
    const complementData = {
      ...this.collectComplementDataForm.value,
    } as CollectComplementDataFormValue;

    this.collectService.insertAPlantCollectHandler(complementData);
  }
}
