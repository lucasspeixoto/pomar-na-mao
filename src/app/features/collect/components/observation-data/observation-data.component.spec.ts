/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationDataComponent } from './observation-data.component';
import { CollectService } from '../../services/collect/collect.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObservationDataService } from '../../services/observation-data/observation-data.service';

describe('ObservationDataComponent', () => {
  let component: ObservationDataComponent;
  let fixture: ComponentFixture<ObservationDataComponent>;
  let observationDataService: jest.Mocked<ObservationDataService>;
  let notificationService: jest.Mocked<NzNotificationService>;

  beforeEach(() => {
    const collectServiceMock = { insertAPlantCollectHandler: jest.fn() };
    const observationDataServiceMock = { setCollectObservationDataFormValue: jest.fn() };
    const notificationServiceMock = { success: jest.fn() };

    TestBed.configureTestingModule({
      imports: [
        NzCardModule,
        NzButtonModule,
        NzInputModule,
        NzGridModule,
        NzDatePickerModule,
        NzFormModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        { provide: CollectService, useValue: collectServiceMock },
        { provide: ObservationDataService, useValue: observationDataServiceMock },
        { provide: NzNotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationDataComponent);
    component = fixture.componentInstance;

    observationDataService = TestBed.inject(
      ObservationDataService
    ) as jest.Mocked<ObservationDataService>;

    notificationService = TestBed.inject(
      NzNotificationService
    ) as jest.Mocked<NzNotificationService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
