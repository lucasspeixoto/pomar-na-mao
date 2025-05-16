import { Component, EventEmitter, inject, Input, Output, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { lycheeVarieties } from '../../../constants/lychee-varieties';
import { ObservationDataService } from '../../../services/observation-data/observation-data.service';
import {
  createCollectObservationDataForm,
  initialCollectObservationData,
  CollectObservationDataFormValue,
} from '../../../constants/collect-observation-data-form';

const PRIMENG = [
  InputMaskModule,
  DatePickerModule,
  ButtonModule,
  ToastModule,
  TextareaModule,
  SelectModule,
  InputTextModule,
  DialogModule,
  MessageModule,
  CheckboxModule,
];

const COMMON = [NgIf, AsyncPipe, CardModule, FormsModule, ReactiveFormsModule];

const PROVIDERS = [MessageService];

@Component({
  selector: 'app-observation-dialog',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './observation-dialog.component.html',
  styleUrl: './observation-dialog.component.scss',
  providers: [...PROVIDERS],
})
export class ObservationDialogComponent {
  @Input() public isVisible!: boolean;

  @Output() dialogClosed = new EventEmitter<void>();

  @Output() updateDataHandler = new EventEmitter<void>();

  private observationDataService = inject(ObservationDataService);

  public collectObservationDataForm = createCollectObservationDataForm();

  public lycheeVarieties = lycheeVarieties;

  public collectObservationDataFormChange$ = this.collectObservationDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      if (this.collectObservationDataForm.valid) {
        this.observationDataService.setCollectObservationDataFormValue(
          value as CollectObservationDataFormValue
        );
      }
    })
  );

  constructor() {
    effect(() => {
      const complementData = this.observationDataService.getCollectObservationDataFormValue();

      if (complementData) {
        this.collectObservationDataForm.setValue(complementData);
      }
    });
  }

  public hideDialog(): void {
    this.observationDataService.setCollectObservationDataFormValue(initialCollectObservationData);
    this.isVisible = false;
    this.dialogClosed.emit();
  }

  public updateCollectHandler(): void {
    this.updateDataHandler.emit();
    /* const {
      id,
      stick,
      brokenBranch,
      vineGrowing,
      burntBranch,
      struckByLightning,
      drill,
      anthill,
      inExperiment,
      weedsInTheBasin,
      fertilizationOrManuring,
      mites,
      thrips,
      emptyCollectionBoxNear,
    } = this.collectObservationDataForm.value as CollectObservationDataFormValue;

    this.indexDbCollectService.findCollectById(id!).subscribe(value => {
      const updatedPlantData = {
        ...value,
        stick,
        broken_branch: brokenBranch,
        vine_growing: vineGrowing,
        burnt_branch: burntBranch,
        struck_by_lightning: struckByLightning,
        drill,
        anthill,
        in_experiment: inExperiment,
        weeds_in_the_basin: weedsInTheBasin,
        fertilization_or_manuring: fertilizationOrManuring,
        mites,
        thrips,
        empty_collection_box_near: emptyCollectionBoxNear,
      } as PlantData;

      this.indexDbCollectService.updateCollect(updatedPlantData, true).subscribe();
    }); */
  }
}
