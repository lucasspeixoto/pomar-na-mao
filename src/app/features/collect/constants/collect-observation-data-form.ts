import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

type CollectObservationDataFormControl = {
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

export function createCollectObservationDataForm(): FormGroup<CollectObservationDataFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
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

export type CollectObservationDataFormGroup = ReturnType<typeof createCollectObservationDataForm>;

export type CollectObservationDataFormValue = ReturnType<
  CollectObservationDataFormGroup['getRawValue']
>;
