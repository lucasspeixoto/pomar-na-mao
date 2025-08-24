import { computed, inject, Injectable, signal } from '@angular/core';
import { type WorkRoutinePlants } from '../models/work-routine.model';
import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class WorkRoutinePlantsStore {
  private supabase = injectSupabase();

  public messageService = inject(MessageService);

  private _workRoutinePlants = signal<WorkRoutinePlants[]>([]);
  public workRoutinePlants = this._workRoutinePlants.asReadonly();

  public numberOfPlantsInSelectedWorkRoutines = computed(() => this._workRoutinePlants().length);

  public setWorkRoutinePlants(workRoutinePlants: WorkRoutinePlants[]): void {
    this._workRoutinePlants.set(workRoutinePlants);
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

  public async getWorkRoutinePlantsDataHandler(id: string): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase
      .from('work_routines_plants')
      .select('*')
      .eq('work_routine_id', id);

    if (!error) {
      this.setWorkRoutinePlants(data);
    }

    if (error) {
      this.setWorkRoutinePlants([]);
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
