import { computed, inject, Injectable, signal } from '@angular/core';

import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';
import { RoutinePlants } from '../../models/routine.model';

@Injectable({
  providedIn: 'root',
})
export class InspectRoutinePlantsStore {
  private supabase = injectSupabase();

  public messageService = inject(MessageService);

  private _inspectRoutinePlants = signal<RoutinePlants[]>([]);
  public inspectRoutinePlants = this._inspectRoutinePlants.asReadonly();

  public numberOfPlantsInSelectedInspectRoutines = computed(
    () => this._inspectRoutinePlants().length
  );

  public setInspectRoutinePlants(workRoutinePlants: RoutinePlants[]): void {
    this._inspectRoutinePlants.set(workRoutinePlants);
  }

  //* --------- Estado de Loading
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }

  public async getInspectRoutinePlantsDataHandler(id: string): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase
      .from('inspect_routines_plants')
      .select('*')
      .eq('inspect_routine_id', id);

    if (!error) {
      this.setInspectRoutinePlants(data);
    }

    if (error) {
      this.setInspectRoutinePlants([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail:
          'Erro ao carregar plantas para a rotina de trabalho selecionada, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.stopLoading();
  }
}
