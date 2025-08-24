import { computed, inject, Injectable, signal } from '@angular/core';
import { WorkRoutine } from '../models/work-routine.model';
import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class WorkRoutineStore {
  // * Dependencias
  private supabase = injectSupabase();

  public messageService = inject(MessageService);

  //* --------- Filtros de Busca das rotinas
  public selectedApprovedStatus = signal<boolean | null>(null);
  public selectedRegion = signal<string | null>(null);
  public selectedOccurrence = signal<string | null>(null);

  //* --------- Rotinas
  private _workRoutines = signal<WorkRoutine[]>([]);
  public workRoutines = this._workRoutines.asReadonly();

  private _selectedWorkRoutine = signal<WorkRoutine | null>(null);
  public selectedWorkRoutine = this._selectedWorkRoutine.asReadonly();

  public numberOfWorkRoutines = computed(() => this._workRoutines().length);

  public setWorkRoutines(workRoutines: WorkRoutine[]): void {
    this._workRoutines.set(workRoutines);
  }

  public setSelectedWorkRoutine(workRoutine: WorkRoutine): void {
    this._selectedWorkRoutine.set(workRoutine);
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

  public async getWorkRoutinesDataHandler(): Promise<void> {
    this.startLoading();

    let query = this.supabase
      .from('work_routines')
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
      this.setWorkRoutines(data);
    }

    if (error) {
      this.setWorkRoutines([]);
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
