import { Injectable, signal, WritableSignal } from '@angular/core';

const COLLECT_MOBILE_STEPS: { step: number; status: string; icon: string }[] = [
  { step: 0, status: 'finish', icon: 'user' },
  { step: 1, status: 'wait', icon: 'file-image' },
  { step: 2, status: 'wait', icon: 'database' },
  { step: 3, status: 'wait', icon: 'form' },
];

const COLLECT_DESKTOP_STEPS: { step: number; status: string; title: string }[] = [
  { step: 0, status: 'wait', title: 'GPS' },
  { step: 1, status: 'wait', title: 'Imagem' },
  { step: 2, status: 'wait', title: 'Dados' },
  { step: 3, status: 'wait', title: 'Ocorrências' },
];

@Injectable({
  providedIn: 'root',
})
export class CollectStepService {
  public collectStep = signal(0);

  public collectMobileSteps = signal(COLLECT_MOBILE_STEPS);

  public collectDesktopSteps = signal(COLLECT_DESKTOP_STEPS);

  public setCollectStep(step: number): void {
    this.collectStep.set(step);
  }

  public getCollectStep(): WritableSignal<number> {
    return this.collectStep;
  }

  public getCollectMobileSteps(): WritableSignal<typeof COLLECT_MOBILE_STEPS> {
    return this.collectMobileSteps;
  }

  public getCollectDesktopSteps(): WritableSignal<typeof COLLECT_DESKTOP_STEPS> {
    return this.collectDesktopSteps;
  }
}
