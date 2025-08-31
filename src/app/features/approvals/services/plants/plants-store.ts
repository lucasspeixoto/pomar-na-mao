import { inject, Injectable, signal } from '@angular/core';
import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';
import type { PlantData } from '../../models/plant-data.model';

@Injectable({
  providedIn: 'root',
})
export class PlantsStore {
  private supabase = injectSupabase();

  public messageService = inject(MessageService);

  private _selectedPlant = signal<PlantData | null>(null);
  public selectedPlant = this._selectedPlant.asReadonly();

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

    const { data, error } = await this.supabase
      .from('plant_collect')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      this._selectedPlant.set(data);
    } else {
      this._selectedPlant.set(null);
    }

    this.stopLoading();
  }
}
