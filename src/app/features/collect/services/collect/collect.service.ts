import { PlantUploadService } from './../plant-upload/plant-upload.service';
import { ObservationDataService } from './../observation-data/observation-data.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from 'primeng/api';
import { initialCollectObservationData } from '@collectCs/collect-observation-data-form';
import { PlantData } from '@collectM/collect.model';
import { ComplementDataService } from '@collectS/complement-data/complement-data.service';
import { GeolocationService } from '@collectS/geolocation/geolocation.service';
import { checkCurrencStorageStep } from '@collectU/localstorage';
import { IndexDbCollectService } from '@sharedS/index-db/index-db-collect.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { injectSupabase } from '@utils/inject-supabase';
import { delay } from '@sharedU/timer';

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  private supabase = injectSupabase();

  public geolocationService = inject(GeolocationService);

  public observationDataService = inject(ObservationDataService);

  public loadingService = inject(LoadingService);

  public complementDataService = inject(ComplementDataService);

  public plantUploadService = inject(PlantUploadService);

  public indexDbCollectService = inject(IndexDbCollectService);

  public messageService = inject(MessageService);

  public plantData = signal<PlantData[]>([]);

  public numberOfCollectedData = computed(() => this.plantData().length);

  public filteredCollectData = signal<PlantData[]>([]);

  public numberOfFilteredCollects = computed(() => this.filteredCollectData().length);

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
        console.warn('Erro ao carregar base de coletas, tente novamente mais tarde!');
      }
    }, 2000);
  }

  public async insertAPlantCollectHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    this.loadingService.message.set('Reposicionando...');

    await delay(5000);

    this.loadingService.message.set('Salvando...');

    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (!complementData) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
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

    const { mass, harvest, description, plantingDate, lifeOfTheTree, variety, region } =
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
      region: region.toUpperCase(),
    };

    const { data, error } = await this.supabase
      .from('plant_collect')
      .insert([newCollectData])
      .select();

    const { error: plantPhotoInsertError } = await this.supabase.storage
      .from('plant-collect')
      .upload(`uploads/${data![0]?.id!}.png`, this.plantUploadService.plantPhotoFile()!);

    if (plantPhotoInsertError) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Foto',
        detail: 'Ocorreu um erro ao inserir a foto, inclua novamente no painel',
        life: 3000,
      });
    }

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

    this.loadingService.message.set('Carregando...');
  }

  public async updateAPlantCollectComplementDataHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { mass, harvest, description, plantingDate, lifeOfTheTree, variety } =
      this.complementDataService.getCollectComplementDataFormValue()!;

    const collectData = {
      mass,
      harvest,
      variety,
      description,
      planting_date: plantingDate,
      life_of_the_tree: lifeOfTheTree,
    };

    const { error } = await this.supabase.from('plant_collect').update([collectData]).eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Erro ao editar dados complementares coleta, verifique as informações e tente novamente!',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Editado',
        detail: 'Dados complementares editados com sucesso!',
        life: 3000,
      });
    }
  }

  public async updateAPlantCollectObservationDataHandler(id: string): Promise<void> {
    this.loadingService.isLoading.set(true);

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

    const collectData = {
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

    const { error } = await this.supabase.from('plant_collect').update([collectData]).eq('id', id);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao editar dados de observação, verifique as informações e tente novamente!',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Editado',
        detail: 'Dados de observação editados com sucesso!',
        life: 3000,
      });
    }
  }

  public async syncAllCollectPlantHandler(plantDatas: PlantData[]): Promise<void> {
    this.loadingService.isLoading.set(true);

    const plantDataUpdate = plantDatas.map(item => {
      return {
        ...item,
        photo_url: `https://cumkqrjwsbyotaojeyxv.supabase.co/storage/v1/object/public/plant-collect/uploads/${item.id}.png`,
      };
    });

    const { error } = await this.supabase.from('plant_collect').insert(plantDataUpdate);

    const plantDataIds = plantDataUpdate.map(item => item.id);

    if (!error) {
      this.indexDbCollectService.deleteManyCollects(plantDataIds, false).subscribe();

      this.resetCollectData();

      this.getAllCollectsDataHandler();

      this.messageService.add({
        severity: 'success',
        summary: 'Sincronizado',
        detail: 'Dados sincronizados com sucesso!',
        life: 3000,
      });
    }

    await Promise.all(
      plantDatas.map(item =>
        this.supabase.storage
          .from('plant-collect')
          .upload(`uploads/${item.id!}.png`, item.photo_url!)
      )
    );

    this.loadingService.isLoading.set(false);
  }

  public async storageAPlantCollectHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    this.loadingService.message.set('Reposicionando...');

    await delay(5000);

    this.loadingService.message.set('Armazenando...');

    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (!complementData) {
      this.loadingService.isLoading.set(false);
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
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

    const { mass, variety, harvest, description, plantingDate, lifeOfTheTree, region } =
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

    let newCollectData = {
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
      region: region.toUpperCase(),
    } as PlantData;

    const file = this.plantUploadService.plantPhotoFile() as File;

    const renamedFile = new File([file], `${newCollectData.id}.png`, {
      type: file.type,
      lastModified: file.lastModified,
    });

    newCollectData = {
      ...newCollectData,
      photo_url: renamedFile,
    };

    this.indexDbCollectService.addCollect(newCollectData).subscribe();

    this.resetCollectData();

    this.loadingService.message.set('Carregando...');
  }

  public resetCollectData(): void {
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.observationDataService.setCollectObservationDataFormValue(initialCollectObservationData);
    localStorage.setItem('POMAR-NA-MAO:COLLECT-STEP', '0');
    this.currentCollectStep.set(0);
  }

  public clearSelectedCollectsFromFilters(): void {
    this.filteredCollectData.set([]);
  }

  public async getAllFilteredCollectsDataHandler(
    harvest: string | null,
    region: string | null,
    occurrence: string | null,
    variety: string | null,
    massRange: number[]
  ): Promise<void> {
    this.loadingService.isLoading.set(true);

    let query = this.supabase
      .from('plant_collect')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (region) {
      query = query.eq('region', region);
    }

    if (harvest && harvest.trim() !== '') {
      query = query.ilike('harvest', `%${harvest}%`);
    }

    if (occurrence) {
      query = query.is(`${occurrence}`, true);
    }

    if (variety && variety.trim() !== '') {
      query = query.ilike('variety', `%${variety}%`);
    }

    if (massRange) {
      query = query.gte('mass', massRange[0]).lte('mass', massRange[1]);
    }

    const { data, error } = await query;

    if (!error) this.filteredCollectData.set(data);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.filteredCollectData.set([]);
        console.warn('Erro ao carregar coletas através de filtros, tente novamente mais tarde!');
      }
    }, 2000);
  }
}
