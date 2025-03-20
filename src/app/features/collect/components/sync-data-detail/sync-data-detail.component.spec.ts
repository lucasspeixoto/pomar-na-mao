/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SyncDataDetailComponent } from './sync-data-detail.component';
import { SynchronizeService } from '../../services/synchronize/synchronize.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MOCKED_PLANT } from '../../../../__mocks__/plant';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SyncDataDetailComponent', () => {
  let component: SyncDataDetailComponent;
  let fixture: ComponentFixture<SyncDataDetailComponent>;
  let synchronizeService: jest.Mocked<SynchronizeService>;

  beforeEach(() => {
    const synchronizeServiceMock = { setSyncronizeDataFormValue: jest.fn() };

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
        { provide: SynchronizeService, useValue: synchronizeServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncDataDetailComponent);
    component = fixture.componentInstance;

    synchronizeService = TestBed.inject(SynchronizeService) as jest.Mocked<SynchronizeService>;

    component.selectedCollect = MOCKED_PLANT;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call setSyncronizeDataFormValue with selectedCollect data', () => {
      expect(synchronizeService.setSyncronizeDataFormValue).toHaveBeenCalledWith(MOCKED_PLANT);
    });
  });
});
