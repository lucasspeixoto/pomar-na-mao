import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

type CollectObservationDataFormControl = {
  /* mass: FormControl<string>;
  variety: FormControl<string>;
  plantingDate: FormControl<string>;
  harvest: FormControl<string>;
  description: FormControl<string>;
  lifeOfTheTree: FormControl<string>; */
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
    /* mass: new FormControl('', {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    variety: new FormControl('', {
      validators: [Validators.minLength(3)],
      nonNullable: true,
    }),
    plantingDate: new FormControl('', {
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
    }),*/
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
