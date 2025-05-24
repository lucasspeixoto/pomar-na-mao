import { inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

type CollectComplementDataFormControl = {
  id: FormControl<string>;
  mass: FormControl<string>;
  variety: FormControl<string>;
  plantingDate: FormControl<Date | string>;
  harvest: FormControl<string>;
  region: FormControl<string>;
  description: FormControl<string>;
  lifeOfTheTree: FormControl<string>;
};

export function createCollectComplementDataForm(): FormGroup<CollectComplementDataFormControl> {
  const formBuilder = inject(UntypedFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
    }),
    mass: new FormControl('', {
      validators: [Validators.required, Validators.min(0)],
    }),
    variety: new FormControl('', {
      validators: [Validators.minLength(3)],
    }),
    plantingDate: new FormControl(new Date(), {
      validators: [],
    }),
    harvest: new FormControl('', {
      validators: [],
    }),
    region: new FormControl('', {
      validators: [Validators.required, Validators.max(1000)],
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(150)],
    }),
    lifeOfTheTree: new FormControl('', {
      validators: [Validators.maxLength(10)],
    }),
  });
}

export type CollectComplementDataFormGroup = ReturnType<typeof createCollectComplementDataForm>;

export type CollectComplementDataFormValue = ReturnType<
  CollectComplementDataFormGroup['getRawValue']
>;
