import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectFormService {
  public plantPhotoString = signal('');
}
