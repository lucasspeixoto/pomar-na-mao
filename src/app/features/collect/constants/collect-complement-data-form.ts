import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type CollectComplementDataFormControl = {
  id: FormControl<string>;
  mass: FormControl<string>;
  variety: FormControl<string>;
  plantingDate: FormControl<string>;
  harvest: FormControl<string>;
  description: FormControl<string>;
  lifeOfTheTree: FormControl<string>;
};

export function createCollectComplementDataForm(): FormGroup<CollectComplementDataFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
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
    }),
  });
}

export type CollectComplementDataFormGroup = ReturnType<typeof createCollectComplementDataForm>;

export type CollectComplementDataFormValue = ReturnType<
  CollectComplementDataFormGroup['getRawValue']
>;
