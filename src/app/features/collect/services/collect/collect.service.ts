import { ObservationDataService } from './../observation-data/observation-data.service';
import { inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { GeolocationService } from '../geolocation/geolocation.service';
import { PlantData } from '../../models/collect.model';

import { ComplementDataService } from '../complement-data/complement-data.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { IndexDbCollectService } from 'src/app/services/index-db/index-db-collect.service';
import { injectSupabase } from 'src/app/utils/inject-supabase';
import { checkCurrencStorageStep } from '../../utils/localstorage';
import { MessageService } from 'primeng/api';
import { initialCollectObservationData } from '../../constants/collect-observation-data-form';

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  private supabase = injectSupabase();

  public geolocationService = inject(GeolocationService);

  public observationDataService = inject(ObservationDataService);

  public loadingService = inject(LoadingService);

  public complementDataService = inject(ComplementDataService);

  public indexDbCollectService = inject(IndexDbCollectService);

  public messageService = inject(MessageService);

  public plantData = signal<PlantData[]>([]);

  public currentCollectStep = signal<number>(checkCurrencStorageStep());

  public async getAllCollectsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('plant_collect')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (!error) this.plantData.set(data);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.plantData.set([]);
        //this.messageService.error('Erro ao carregar base de coletas, tente novamente mais tarde!');
      }
    }, 2000);
  }

  public async insertAPlantCollectHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (!complementData) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Dados complementares não foram salvos!',
        life: 3000,
      });
      return;
    }

    this.geolocationService.getLocaltionCoordinate();

    if (!this.geolocationService.isCoordinatesAvailable()) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível obter as coordenadas!',
        life: 3000,
      });
      return;
    }

    const { mass, harvest, description, plantingDate, lifeOfTheTree, variety } =
      this.complementDataService.getCollectComplementDataFormValue()!;

    const {
      stick,
      brokenBranch,
      vineGrowing,
      burntBranch,
      struckByLightning,
      drill,
      anthill,
      inExperiment,
      weedsInTheBasin,
      fertilizationOrManuring,
      mites,
      thrips,
      emptyCollectionBoxNear,
    } = this.observationDataService.getCollectObservationDataFormValue()!;

    const { longitude, latitude } = this.geolocationService.coordinates()!;

    const newCollectData = {
      created_at: new Date().toISOString(),
      longitude,
      latitude,
      gps_timestamp: this.geolocationService.coordinatesTimestamp(),
      mass,
      harvest,
      variety,
      description,
      planting_date: plantingDate,
      life_of_the_tree: lifeOfTheTree,
      stick,
      broken_branch: brokenBranch,
      vine_growing: vineGrowing,
      burnt_branch: burntBranch,
      struck_by_lightning: struckByLightning,
      drill,
      anthill,
      in_experiment: inExperiment,
      weeds_in_the_basin: weedsInTheBasin,
      fertilization_or_manuring: fertilizationOrManuring,
      mites,
      thrips,
      empty_collection_box_near: emptyCollectionBoxNear,
    };

    const { error } = await this.supabase.from('plant_collect').insert([newCollectData]);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao inserir coleta, verifique as informações e tente novamente!',
          life: 3000,
        });
      } else {
        this.resetCollectData();
        this.messageService.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Registro de coleta armazenado!',
          life: 3000,
        });
      }
    }, 2000);
  }

  public async syncAllCollectPlantHandler(plantDatas: PlantData[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.from('plant_collect').insert(plantDatas);

    const plantDataIds = plantDatas.map(item => item.id);

    if (!error) {
      this.indexDbCollectService.deleteManyCollects(plantDataIds, false).subscribe();
      this.resetCollectData();
      this.messageService.add({
        severity: 'success',
        summary: 'Sincronizado',
        detail: 'Dados sincronizados com sucesso!',
        life: 3000,
      });
    }

    this.loadingService.isLoading.set(false);
  }

  public async storageAPlantCollectHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (!complementData) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Dados complementares não foram salvos!',
        life: 3000,
      });
      return;
    }

    this.geolocationService.getLocaltionCoordinate();

    if (!this.geolocationService.isCoordinatesAvailable()) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível obter as coordenadas!',
        life: 3000,
      });
      return;
    }

    const { mass, variety, harvest, description, plantingDate, lifeOfTheTree } =
      this.complementDataService.getCollectComplementDataFormValue()!;

    const { longitude, latitude } = this.geolocationService.coordinates()!;

    const {
      stick,
      brokenBranch,
      vineGrowing,
      burntBranch,
      struckByLightning,
      drill,
      anthill,
      inExperiment,
      weedsInTheBasin,
      fertilizationOrManuring,
      mites,
      thrips,
      emptyCollectionBoxNear,
    } = this.observationDataService.getCollectObservationDataFormValue()!;

    const newCollectData = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      longitude,
      latitude,
      gps_timestamp: this.geolocationService.coordinatesTimestamp(),
      mass,
      variety,
      harvest,
      description,
      planting_date: plantingDate,
      life_of_the_tree: lifeOfTheTree,
      stick,
      broken_branch: brokenBranch,
      vine_growing: vineGrowing,
      burnt_branch: burntBranch,
      struck_by_lightning: struckByLightning,
      drill,
      anthill,
      in_experiment: inExperiment,
      weeds_in_the_basin: weedsInTheBasin,
      fertilization_or_manuring: fertilizationOrManuring,
      mites,
      thrips,
      empty_collection_box_near: emptyCollectionBoxNear,
    } as PlantData;

    this.indexDbCollectService.addCollect(newCollectData).subscribe();

    this.resetCollectData();
  }

  public resetCollectData(): void {
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.observationDataService.setCollectObservationDataFormValue(initialCollectObservationData);
  }
}
