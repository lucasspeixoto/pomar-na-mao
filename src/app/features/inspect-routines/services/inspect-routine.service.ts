import { computed, inject, Injectable, signal } from '@angular/core';
import { injectSupabase } from '../../../utils/inject-supabase';
import { Routine } from '../models/routine.model';
import { ToastService } from '../../../shared/services/toast.service';
import { parseDateString } from '../../../utils/date';

export type InspectRoutinesSearchInfo = {
  userId: string | null;
  region: string | null;
  createdAtRangeDate: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class InspectRoutineService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  private _isComparisonActive = signal(false);
  public isComparisonActive = this._isComparisonActive.asReadonly();

  private _inspectRoutines = signal<Routine[]>([]);
  public inspectRoutines = this._inspectRoutines.asReadonly();

  private _selectedInspectRoutine = signal<Routine | null>(null);
  public selectedInspectRoutine = this._selectedInspectRoutine.asReadonly();

  public numberOfInspectRoutines = computed(() => this._inspectRoutines().length);

  public setIsComparisonActive(state: boolean): void {
    this._isComparisonActive.set(state);
  }

  public setInspectRoutines(inspectRoutines: Routine[]): void {
    this._inspectRoutines.set(inspectRoutines);
  }

  public setSelectedInspectRoutine(inspectRoutine: Routine | null): void {
    this._selectedInspectRoutine.set(inspectRoutine);
  }

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }

  public async getFilteredInspectRoutinesDataHandler(
    inspectRoutinesSearchInfo: InspectRoutinesSearchInfo
  ): Promise<void> {
    this.startLoading();

    const { userId, region, createdAtRangeDate } = inspectRoutinesSearchInfo;

    let query = this.supabase
      .from('inspect_routines')
      .select('*, users(full_name, email)')
      .order('created_at', { ascending: false });

    if (region) {
      query = query.eq('region', region);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (createdAtRangeDate) {
      const startDate = createdAtRangeDate!.split(' - ')[0];
      const endDate = createdAtRangeDate!.split(' - ')[1];

      const parsedStartDate = parseDateString(startDate);
      const parsedEndDate = parseDateString(endDate);

      const exclusiveEndDate = new Date(parsedEndDate);
      exclusiveEndDate.setDate(parsedEndDate.getDate() + 1);

      query = query.gte('created_at', parsedStartDate.toISOString());
      query = query.lt('created_at', exclusiveEndDate.toISOString());
    }

    const { data, error } = await query;

    if (!error) {
      this.setInspectRoutines(data);
    }

    if (error) {
      this.setInspectRoutines([]);
      this.toastService.show(
        'Erro',
        'Erro ao carregar rotinas, tente novamente mais tarde!',
        'error'
      );
    }

    this.stopLoading();
  }

  public async getAllInspectRoutinesDataHandler(): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase
      .from('inspect_routines')
      .select('*, users(full_name, email)')
      .order('created_at', { ascending: false });

    if (!error) {
      this.setInspectRoutines(data);
    }

    if (error) {
      this.setInspectRoutines([]);
      this.toastService.show(
        'Erro',
        'Erro ao carregar rotinas, tente novamente mais tarde!',
        'error'
      );
    }

    this.stopLoading();
  }

  public async deleteInspectRoutine(routineId: string): Promise<void> {
    const { error } = await this.supabase.from('inspect_routines').delete().eq('id', routineId);

    if (!error) {
      this.toastService.show('Sucesso', 'Rotina deletada com sucesso!', 'success');
      this.getAllInspectRoutinesDataHandler();
    }
  }
}
