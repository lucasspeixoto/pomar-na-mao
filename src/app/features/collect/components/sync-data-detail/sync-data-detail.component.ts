import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

import { PlantData } from '../../models/collect.model';
import { CustomValidationMessageComponent } from '../../../../shared/components/custom-validation-message/custom-validation-message';
import {
  createSyncronizeDataForm,
  SyncronizeDataFormValue,
} from '../../constants/syncronize-data-form';
import { SynchronizeService } from '../../services/synchronize/synchronize.service';
import { convertKeysToSnakeCase } from '../../../../shared/utils/convert-keyts-to-snake-case';

const COMMON = [NgIf, AsyncPipe, ReactiveFormsModule, CustomValidationMessageComponent];

const ZORRO = [
  NzCardModule,
  NzButtonModule,
  NzInputModule,
  NzGridModule,
  NzDatePickerModule,
  NzFormModule,
  NzCheckboxModule,
];

@Component({
  selector: 'app-sync-data-detail',
  imports: [...COMMON, ...ZORRO],
  templateUrl: './sync-data-detail.component.html',
  styleUrls: ['./sync-data-detail.component.scss'],
})
export class SyncDataDetailComponent implements OnInit {
  @Input() public selectedCollect!: PlantData;

  public synchronizeService = inject(SynchronizeService);

  public syncronizeDataForm = createSyncronizeDataForm();

  public syncronizeDataFormValues$ = this.syncronizeDataForm.valueChanges.pipe(
    debounceTime(400),
    tap(value => {
      const plantData: PlantData = convertKeysToSnakeCase(value);
      this.synchronizeService.setSyncronizeDataFormValue(plantData);
    })
  );

  public ngOnInit(): void {
    this.syncronizeDataForm.patchValue(this.transformPlantDataIntoFormObject());
    this.synchronizeService.setSyncronizeDataFormValue(this.selectedCollect);
  }

  public transformPlantDataIntoFormObject(): SyncronizeDataFormValue {
    const {
      id,
      latitude,
      longitude,
      gps_timestamp,
      mass,
      variety,
      planting_date,
      harvest,
      description,
      life_of_the_tree,
      stick,
      broken_branch,
      vine_growing,
      burnt_branch,
      struck_by_lightning,
      drill,
      anthill,
      in_experiment,
      weeds_in_the_basin,
      fertilization_or_manuring,
      mites,
      thrips,
      empty_collection_box_near,
    } = this.selectedCollect;

    return {
      id,
      latitude,
      longitude,
      gpsTimestamp: gps_timestamp,
      mass,
      variety,
      plantingDate: new Date(planting_date),
      harvest,
      description,
      lifeOfTheTree: life_of_the_tree,
      stick,
      brokenBranch: broken_branch,
      vineGrowing: vine_growing,
      burntBranch: burnt_branch,
      struckByLightning: struck_by_lightning,
      drill,
      anthill,
      inExperiment: in_experiment,
      weedsInTheBasin: weeds_in_the_basin,
      fertilizationOrManuring: fertilization_or_manuring,
      mites,
      thrips,
      emptyCollectionBoxNear: empty_collection_box_near,
    } as SyncronizeDataFormValue;
  }
}
