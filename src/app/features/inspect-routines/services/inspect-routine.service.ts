import { computed, inject, Injectable, signal } from '@angular/core';
import { injectSupabase } from '../../../utils/inject-supabase';
import { Routine } from '../models/routine.model';
import { ToastService } from '../../../shared/services/toast.service';
import { parseDateString } from '../../../utils/date';

@Injectable({
  providedIn: 'root',
})
export class InspectRoutineService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  private _isComparisonActive = signal(false);
  public isComparisonActive = this._isComparisonActive.asReadonly();

  /* Routines filters */
  public selectedRegion = signal<string | null>(null);
  public selectedUserId = signal<string | null>(null); //'6c32bee6-8f87-476d-b609-bd2e9b904759'
  public selectedRangeDate = signal<string | null>(null); //'21/10/2025 - 25/10/2025'

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

  public async getInspectRoutinesDataHandler(): Promise<void> {
    this.startLoading();

    let query = this.supabase
      .from('inspect_routines')
      .select('*, users(full_name, email)')
      .order('created_at', { ascending: false });

    if (this.selectedRegion()) {
      query = query.eq('region', this.selectedRegion());
    }

    if (this.selectedUserId()) {
      query = query.eq('user_id', this.selectedUserId());
    }

    if (this.selectedRangeDate()) {
      const startDate = this.selectedRangeDate()!.split(' - ')[0];
      const endDate = this.selectedRangeDate()!.split(' - ')[1];

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

  public async deleteInspectRoutine(routineId: string): Promise<void> {
    const { error } = await this.supabase.from('inspect_routines').delete().eq('id', routineId);

    if (!error) {
      this.toastService.show('Sucesso', 'Rotina deletada com sucesso!', 'success');
      this.getInspectRoutinesDataHandler();
    }
  }

  public clearFilters(): void {
    this.selectedRegion.set(null);
    this.selectedUserId.set(null);
    this.selectedRangeDate.set(null);
  }
}
