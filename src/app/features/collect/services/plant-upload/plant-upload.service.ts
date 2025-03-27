import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlantUploadService {
  public plantPhotoString = signal('');

  public imageName = signal('');

  public fileSize = signal(0);

  public isLoading = signal(false);

  public resetSelectedImage(): void {
    this.plantPhotoString.set('');
    this.imageName.set('');
    this.fileSize.set(0);
  }
}
