import { computed, inject, Injectable, signal } from '@angular/core';
import { injectSupabase } from '../../../utils/inject-supabase';
import type { RoutinePlants } from '../models/routine.model';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class InspectRoutinePlantsService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  private _inspectRoutinePlants = signal<RoutinePlants[]>([]);
  public inspectRoutinePlants = this._inspectRoutinePlants.asReadonly();

  public totalOfInspectRoutinePlants = computed(() => this._inspectRoutinePlants().length);

  private _selectedPlantInComparison = signal<RoutinePlants | null>(null);
  public selectedPlantInComparison = this._selectedPlantInComparison.asReadonly();

  public approvedInspectRoutinePlants = computed(() =>
    this._inspectRoutinePlants().filter(plant => plant.is_approved)
  );

  public numberOfPlantsInSelectedInspectRoutines = computed(
    () => this._inspectRoutinePlants().length
  );

  public setInspectRoutinePlants(workRoutinePlants: RoutinePlants[]): void {
    this._inspectRoutinePlants.set(workRoutinePlants);
  }

  public setSelectedPlantInComparison(plant: RoutinePlants): void {
    this._selectedPlantInComparison.set(plant);
  }

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }

  public async deleteInspectRoutinePlantHandler(inspectRoutinePlantId: string): Promise<void> {
    this.startLoading();

    const { error } = await this.supabase
      .from('inspect_routines_plants')
      .delete()
      .eq('id', inspectRoutinePlantId);

    if (error) {
      this.toastService.show(
        'Erro',
        'Erro ao negar atualização da planta, tente novamente mais tarde!',
        'error'
      );
      throw new Error(`Erro ao negar atualização da planta: ${error?.message}`);
    }
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
      this.toastService.show(
        'Erro',
        'Erro ao carregar plantas para a rotina de trabalho selecionada, tente novamente mais tarde!',
        'error'
      );
    }

    this.stopLoading();
  }

  public async approveInspectRoutinePlant(inspectRoutinePlantId: string): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase
      .from('inspect_routines_plants')
      .update({ is_approved: true })
      .eq('id', inspectRoutinePlantId)
      .select()
      .single();

    if (error) {
      this.toastService.show(
        'Erro',
        'Erro marcar planta como "Alterada", tente novamente mais tarde!',
        'error'
      );

      throw new Error(`Planta atualizada porem erro ao informar data: ${error?.message}`);
    }

    this.setInspectRoutinePlants(data);

    this.stopLoading();
  }
}
