import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlantUploadService {
  public plantPhotoString = signal('');

  public isLoading = signal(false);
}
