/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed } from '@angular/core/testing';

import { CollectService } from './collect.service';
import { PlantFileService } from '../plant-file/plant-file.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { LoadingService } from '../../../../shared/services/loading/loading.service';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MOCKED_COMPLEMENTS_DATA, MOCKED_PLANT, MOCKED_PLANTS } from '../../../../__mocks__/plant';

// Mock the injectSupabase function
jest.mock('../../../../shared/utils/inject-supabase', () => ({
  injectSupabase: () => mockSupabaseClient,
}));

// Create mock for Supabase client
const mockSupabaseClient = {
  auth: {
    getSession: jest.fn(),
    signOut: jest.fn(),
    signInWithPassword: jest.fn(),
    updateUser: jest.fn(),
    resetPasswordForEmail: jest.fn(),
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn(),
};

describe.only('CollectService', () => {
  let service: CollectService;
  let plantFileService: jest.Mocked<PlantFileService>;
  let geolocationService: jest.Mocked<GeolocationService>;
  let nzMessageService: jest.Mocked<NzMessageService>;
  let loadingService: jest.Mocked<LoadingService>;

  const mockedPlantData = MOCKED_PLANTS;

  const mockedComplementData = MOCKED_COMPLEMENTS_DATA;

  const mockedPlant = MOCKED_PLANT;

  beforeEach(() => {
    // Mock setTimeout
    jest.useFakeTimers();

    const nzMessageServiceSpy = { success: jest.fn(), error: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        CollectService,
        { provide: NzMessageService, useValue: nzMessageServiceSpy },
      ],
    });

    service = TestBed.inject(CollectService);

    plantFileService = TestBed.inject(PlantFileService) as jest.Mocked<PlantFileService>;
    geolocationService = TestBed.inject(GeolocationService) as jest.Mocked<GeolocationService>;
    loadingService = TestBed.inject(LoadingService) as jest.Mocked<LoadingService>;
    nzMessageService = TestBed.inject(NzMessageService) as jest.Mocked<NzMessageService>;

    // External services mocks
    geolocationService.coordinates.set({
      longitude: -46.62529,
      latitude: -23.533773,
    });

    geolocationService.coordinatesTimestamp.set(1709308800);

    plantFileService.plantPhotoString.set('https://example.com/plant1.jpg');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initial state', () => {
    expect(service.plantData()).toEqual([]);
  });

  describe('getAllCollectsDataHandler', () => {
    it('should handler plant_collect query error', async () => {
      // Arrange
      const error = { code: 'unauthenticated_user' };

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            error,
            data: null,
          }),
        }),
      });

      // Act
      const promise = service.getAllCollectsDataHandler();
      await promise;

      // Assert
      expect(loadingService.isLoading()).toBe(true);

      jest.advanceTimersByTime(2000);

      expect(loadingService.isLoading()).toBe(false);
      expect(nzMessageService.error).toHaveBeenCalledWith(
        'Erro ao carregar base de coletas, tente novamente mais tarde!'
      );
      expect(service.plantData()).toEqual([]);
    });

    it('should handler plant_collect query success', async () => {
      // Arrange
      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            error: null,
            data: mockedPlantData,
          }),
        }),
      });

      // Act
      const promise = service.getAllCollectsDataHandler();
      await promise;

      // Assert
      expect(loadingService.isLoading()).toBe(true);
      expect(service.plantData()).toEqual(mockedPlantData);

      jest.advanceTimersByTime(2000);

      expect(loadingService.isLoading()).toBe(false);
    });
  });

  describe('insertAPlantCollectHandler', () => {
    it('should handler plant_collect insert error', async () => {
      // Arrange
      const error = { code: 'unauthenticated_user' };

      mockSupabaseClient.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({
          error,
          data: null,
        }),
      });

      // Act
      const promise = service.insertAPlantCollectHandler(mockedComplementData);
      await promise;

      // Assert
      expect(loadingService.isLoading()).toBe(true);

      jest.advanceTimersByTime(2000);

      expect(loadingService.isLoading()).toBe(false);
      expect(nzMessageService.error).toHaveBeenCalledWith('Erro ao inserir registro!');
    });

    it('should handler plant_collect insert success', async () => {
      // Arrange
      mockSupabaseClient.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({
          error: null,
          data: mockedPlant,
        }),
      });

      // Act
      const promise = service.insertAPlantCollectHandler(mockedComplementData);
      await promise;

      // Assert
      expect(loadingService.isLoading()).toBe(true);

      jest.advanceTimersByTime(2000);

      expect(loadingService.isLoading()).toBe(false);
      expect(nzMessageService.success).toHaveBeenCalledWith('Registro armazenado!');
    });
  });
});
