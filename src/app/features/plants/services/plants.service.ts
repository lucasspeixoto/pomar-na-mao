import { computed, inject, Injectable, signal } from '@angular/core';
import { PlantData } from '../models/plant-data';
import { injectSupabase } from '../../../utils/inject-supabase';
import { ToastService } from '../../../shared/services/toast.service';
import { parseDateString } from '../../../utils/date';
import type { PlantsSearchInfo } from '../models/plants-search-info';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  private supabase = injectSupabase();

  public toastService = inject(ToastService);

  private _selectedPlantInComparison = signal<PlantData | null>(null);
  public selectedPlantInComparison = this._selectedPlantInComparison.asReadonly();

  private _selectedPlant = signal<PlantData | null>(null);
  public selectedPlant = this._selectedPlant.asReadonly();

  private _filteredPlants = signal<PlantData[]>([]);
  public filteredPlants = this._filteredPlants.asReadonly();

  public numberOfPlants = computed(() => this._filteredPlants().length);

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  public startLoading(): void {
    this._isLoading.set(true);
  }

  public stopLoading(): void {
    this._isLoading.set(false);
  }

  public setFilteredPlants(filteredPlants: PlantData[]): void {
    this._filteredPlants.set(filteredPlants);
  }

  public setSelectedPlant(plant: PlantData): void {
    this._selectedPlant.set(plant);
  }

  public async getFilteredPlantsHandler(plantsSearchInfo: PlantsSearchInfo): Promise<void> {
    this.startLoading();

    const { occurrence, region, lastWorkRangeDate } = plantsSearchInfo;

    let query = this.supabase.from('plants').select('*').order('last_work', { ascending: false });

    if (occurrence) query = query.eq(occurrence, true);

    if (region) query = query.eq('region', region);

    if (lastWorkRangeDate) {
      const startDate = lastWorkRangeDate!.split(' - ')[0];
      const endDate = lastWorkRangeDate!.split(' - ')[1];

      const parsedStartDate = parseDateString(startDate);
      const parsedEndDate = parseDateString(endDate);

      const exclusiveEndDate = new Date(parsedEndDate);
      exclusiveEndDate.setDate(parsedEndDate.getDate() + 1);

      query = query.gte('last_work', parsedStartDate.toISOString());
      query = query.lt('last_work', exclusiveEndDate.toISOString());
    }

    const { data, error } = await query;

    if (!error) {
      this.setFilteredPlants(data);
    }

    if (error) {
      this.setFilteredPlants([]);
      this.toastService.show(
        'Erro',
        'Erro ao carregar plantas, tente novamente mais tarde!',
        'error'
      );
    }

    this.stopLoading();
  }

  public async getAllPlantsHandler(): Promise<void> {
    this.startLoading();

    const { data, error } = await this.supabase
      .from('plants')
      .select('*')
      .order('last_work', { ascending: false });

    if (!error) {
      this.setFilteredPlants(data);
    }

    if (error) {
      this.setFilteredPlants([]);
      this.toastService.show(
        'Erro',
        'Erro ao carregar plantas, tente novamente mais tarde!',
        'error'
      );
    }

    this.stopLoading();
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
