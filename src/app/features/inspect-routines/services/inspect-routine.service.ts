import { computed, inject, Injectable, signal } from '@angular/core';
import { injectSupabase } from '../../../utils/inject-supabase';
import { Routine } from '../models/routine.model';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class InspectRoutineService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  public selectedRegion = signal<string | null>(null);
  public selectedOccurrence = signal<string | null>(null);

  private _inspectRoutines = signal<Routine[]>([]);
  public inspectRoutines = this._inspectRoutines.asReadonly();

  private _selectedInspectRoutine = signal<Routine | null>(null);
  public selectedInspectRoutine = this._selectedInspectRoutine.asReadonly();

  public numberOfInspectRoutines = computed(() => this._inspectRoutines().length);

  public setInspectRoutines(inspectRoutines: Routine[]): void {
    this._inspectRoutines.set(inspectRoutines);
  }

  public setSelectedInspectRoutine(inspectRoutine: Routine | null): void {
    this._selectedInspectRoutine.set(inspectRoutine);
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

  public async getInspectRoutinesDataHandler(): Promise<void> {
    this.startLoading();

    let query = this.supabase
      .from('inspect_routines')
      .select('*, users(full_name, email)')
      .order('created_at', { ascending: false });

    if (this.selectedRegion()) {
      query = query.eq('region', this.selectedRegion());
    }

    if (this.selectedOccurrence()) {
      query = query.eq('occurrence', this.selectedOccurrence());
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

    setTimeout(() => {
      this.stopLoading();
    }, 3000);
  }

  public async deleteInspectRoutine(routineId: string): Promise<void> {
    const { error } = await this.supabase.from('inspect_routines').delete().eq('id', routineId);

    if (!error) {
      this.toastService.show('Sucesso', 'Rotina deletada com sucesso!', 'success');
      this.getInspectRoutinesDataHandler();
    }
  }
}
