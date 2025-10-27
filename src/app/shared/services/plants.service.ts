import { inject, Injectable, signal } from '@angular/core';
import { ToastService } from './toast.service';
import type { PlantData } from '../../features/inspect-routines/models/plant-data.model';
import { injectSupabase } from '../../utils/inject-supabase';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  private _selectedPlantInComparison = signal<PlantData | null>(null);
  public selectedPlantInComparison = this._selectedPlantInComparison.asReadonly();

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }

  public async getPlantByIdHandler(id: string): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase.from('plants').select('*').eq('id', id).single();

    if (!error) {
      this._selectedPlantInComparison.set(data);
    } else {
      this._selectedPlantInComparison.set(null);
    }

    this.stopLoading();
  }

  public async updatePlantOccurrences(
    plantId: string,
    occurrences: Partial<PlantData>
  ): Promise<void> {
    this.startLoading();

    const occurrencesAndLastWork = {
      ...occurrences,
      last_work: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('plants')
      .update(occurrencesAndLastWork)
      .eq('id', plantId)
      .select()
      .single();

    if (error) {
      this.toastService.show(
        'Erro',
        'Erro ao atualizar planta, tente novamente mais tarde!',
        'error'
      );
      throw new Error(`Erro ao atualizar planta: ${error?.message}`);
    } else {
      this._selectedPlantInComparison.set(data);
    }

    this.stopLoading();
  }
}
