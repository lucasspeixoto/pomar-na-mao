/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineMapComponent } from './routine-map.component';
import { RoutineMainInfo } from '../../models/routine-main-info.model';
import { FarmRegionService } from '../../../../shared/services/farm-region.service';
import { GeolocationNavigatorService } from '../../../../shared/services/geolocation-navigator.service';
import { PlantsService } from '../../../../shared/services/plants.service';

// --- Mock do Leaflet (L) ---
// Define o objeto L globalmente com métodos espiões (spies) para simular o Leaflet
const mockLeaflet = {
  // O map retorna um objeto com métodos espiões
  map: jasmine.createSpy('L.map').and.returnValue({
    setView: jasmine.createSpy('map.setView'),
    remove: jasmine.createSpy('map.remove'),
    on: jasmine.createSpy('map.on'),
    fitBounds: jasmine.createSpy('map.fitBounds'),
  }),
  // Os layers (tileLayer, circleMarker, polygon) precisam retornar objetos que imitem os métodos do Leaflet
  tileLayer: jasmine.createSpy('L.tileLayer').and.returnValue({
    addTo: jasmine.createSpy('tileLayer.addTo'),
  }),
  circleMarker: jasmine.createSpy('L.circleMarker').and.returnValue({
    addTo: jasmine.createSpy('circleMarker.addTo'),
    remove: jasmine.createSpy('circleMarker.remove'),
  }),
  polygon: jasmine.createSpy('L.polygon').and.returnValue({
    addTo: jasmine
      .createSpy('polygon.addTo')
      .and.callThrough()
      .and.returnValue({
        // Permite chaining
        bringToBack: jasmine
          .createSpy('polygon.bringToBack')
          .and.callThrough()
          .and.returnValue({
            // Permite chaining
            bindPopup: jasmine
              .createSpy('polygon.bindPopup')
              .and.callThrough()
              .and.returnValue({
                // Permite chaining
                openPopup: jasmine
                  .createSpy('polygon.openPopup')
                  .and.callThrough()
                  .and.returnValue({
                    // Último elemento
                    getBounds: jasmine.createSpy('polygon.getBounds').and.returnValue({}), // Necessário para map.fitBounds
                    remove: jasmine.createSpy('polygon.remove'),
                  }),
              }),
          }),
      }),
    getBounds: jasmine.createSpy('polygon.getBounds').and.returnValue({}),
    remove: jasmine.createSpy('polygon.remove'),
  }),
};
// Assinala o mock para a variável global L (como o componente espera)
(window as any).L = mockLeaflet;

// --- Mocks dos Services ---
// Usamos jasmine.createSpy() para as Signals e métodos
class MockFarmRegionService {
  // Signal de leitura
  farmRegions = jasmine.createSpy('farmRegionsSignal').and.returnValue([]);
  // Método assíncrono
  getAllFarmRegionsHandler = jasmine
    .createSpy('getAllFarmRegionsHandler')
    .and.returnValue(Promise.resolve());
}

class MockGeolocationNavigatorService {}

class MockPlantsService {
  // Signal de leitura
  selectedPlantInComparison = jasmine
    .createSpy('selectedPlantInComparisonSignal')
    .and.returnValue(null);
}

describe('RoutineMapComponent', () => {
  let component: RoutineMapComponent;
  let fixture: ComponentFixture<RoutineMapComponent>;
  let farmRegionService: MockFarmRegionService;
  let plantsService: MockPlantsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineMapComponent],
      providers: [
        { provide: FarmRegionService, useClass: MockFarmRegionService },
        {
          provide: GeolocationNavigatorService,
          useClass: MockGeolocationNavigatorService,
        },
        { provide: PlantsService, useClass: MockPlantsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineMapComponent);
    component = fixture.componentInstance;
    component.routineDetail = { region: 'A' } as RoutineMainInfo;
    farmRegionService = TestBed.inject(FarmRegionService) as unknown as MockFarmRegionService;
    plantsService = TestBed.inject(PlantsService) as unknown as MockPlantsService;

    // Resetar os spies do Leaflet entre os testes
    Object.values(mockLeaflet).forEach(spy => (spy as jasmine.Spy).calls.reset());
  });

  it('should create and initialize the map on first change detection', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    // Verifica se L.map foi chamado no initMap (chamado por ngAfterViewInit)
    expect(window.L.map).toHaveBeenCalledWith('map', { zoom: 13 });
    // Verifica se o tile layer foi adicionado
    expect(mockLeaflet.tileLayer().addTo).toHaveBeenCalled();
  });
});
