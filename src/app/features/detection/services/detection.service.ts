import { Injectable, signal } from '@angular/core';
import { Identifier } from '../../../models/identifier';

@Injectable({
  providedIn: 'root',
})
export class DetectionService {
  public isDetectedMode = signal(false);

  public isLoadingMap = signal(false);

  public identifiers = signal<Identifier[]>([]);
}
