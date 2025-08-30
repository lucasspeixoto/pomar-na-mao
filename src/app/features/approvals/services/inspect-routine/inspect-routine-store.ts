import { computed, inject, Injectable, signal } from '@angular/core';
import { Routine } from '../../models/routine.model';
import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class InspectRoutineStore {
  // * Dependencias
  private supabase = injectSupabase();

  public messageService = inject(MessageService);

  //* --------- Filtros de Busca das rotinas
  public selectedApprovedStatus = signal<boolean | null>(null);
  public selectedRegion = signal<string | null>(null);
  public selectedOccurrence = signal<string | null>(null);

  //* --------- Rotinas
  private _inspectRoutines = signal<Routine[]>([]);
  public inspectRoutines = this._inspectRoutines.asReadonly();

  private _selectedInspectRoutine = signal<Routine | null>(null);
  public selectedInspectRoutine = this._selectedInspectRoutine.asReadonly();

  public numberOfInspectRoutines = computed(() => this._inspectRoutines().length);

  public setInspectRoutines(inspectRoutines: Routine[]): void {
    this._inspectRoutines.set(inspectRoutines);
  }

  public setSelectedInspectRoutine(inspectRoutine: Routine): void {
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
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (this.selectedRegion()) {
      query = query.eq('region', this.selectedRegion());
    }

    if (this.selectedApprovedStatus() !== null) {
      query = query.eq('approved', this.selectedApprovedStatus());
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
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar rotinas, tente novamente mais tarde!',
        life: 3000,
      });
    }

    this.stopLoading();
  }
}
