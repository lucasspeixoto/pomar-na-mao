import { inject } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type CollectGeolocationDataFormControl = {
  id: FormControl<string>;
  latitude: FormControl<number | null>;
  longitude: FormControl<number | null>;
  gpsTimestamp: FormControl<number | null>;
};

export function createCollectGeolocationDataForm(): FormGroup<CollectGeolocationDataFormControl> {
  const formBuilder = inject(UntypedFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [Validators.required],
    }),
    latitude: new FormControl(null, {
      validators: [Validators.required],
    }),
    longitude: new FormControl(null, {
      validators: [Validators.required],
    }),
    gpsTimestamp: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
}

export type CollectGeolocationDataFormGroup = ReturnType<typeof createCollectGeolocationDataForm>;

export type CollectGeolocationDataFormValue = ReturnType<
  CollectGeolocationDataFormGroup['getRawValue']
>;

export const initialCollectObservationData = {
  latitude: null,
  longitude: null,
  gpsTimestamp: null,
} as CollectGeolocationDataFormValue;
