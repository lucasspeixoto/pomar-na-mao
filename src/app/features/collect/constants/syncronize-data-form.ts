import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type SyncronizeDataFormControl = {
  id: FormControl<string>;
  latitude: FormControl<number>;
  longitude: FormControl<number>;
  gpsTimestamp: FormControl<number>;
  mass: FormControl<string>;
  variety: FormControl<string>;
  plantingDate: FormControl<Date>;
  harvest: FormControl<string>;
  description: FormControl<string>;
  lifeOfTheTree: FormControl<string>;
  stick: FormControl<boolean>;
  brokenBranch: FormControl<boolean>;
  vineGrowing: FormControl<boolean>;
  burntBranch: FormControl<boolean>;
  struckByLightning: FormControl<boolean>;
  drill: FormControl<boolean>;
  anthill: FormControl<boolean>;
  inExperiment: FormControl<boolean>;
  weedsInTheBasin: FormControl<boolean>;
  fertilizationOrManuring: FormControl<boolean>;
  mites: FormControl<boolean>;
  thrips: FormControl<boolean>;
  emptyCollectionBoxNear: FormControl<boolean>;
};

export function createSyncronizeDataForm(): FormGroup<SyncronizeDataFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    latitude: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    longitude: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    gpsTimestamp: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    mass: new FormControl('', {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    variety: new FormControl('', {
      validators: [Validators.minLength(3)],
      nonNullable: true,
    }),
    plantingDate: new FormControl(new Date(), {
      validators: [],
      nonNullable: true,
    }),
    harvest: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(150)],
      nonNullable: true,
    }),
    lifeOfTheTree: new FormControl('', {
      validators: [Validators.maxLength(10)],
      nonNullable: true,
    }),
    stick: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    brokenBranch: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    vineGrowing: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    burntBranch: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    struckByLightning: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    drill: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    anthill: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    inExperiment: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    weedsInTheBasin: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    fertilizationOrManuring: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    mites: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    thrips: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
    emptyCollectionBoxNear: new FormControl(false, {
      validators: [],
      nonNullable: true,
    }),
  });
}

export type SyncronizeDataFormGroup = ReturnType<typeof createSyncronizeDataForm>;

export type SyncronizeDataFormValue = ReturnType<SyncronizeDataFormGroup['getRawValue']>;
