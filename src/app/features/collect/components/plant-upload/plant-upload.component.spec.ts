/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantUploadComponent } from './plant-upload.component';
import { CollectService } from '../../services/collect/collect.service';
import { IndexDbCollectService } from '../../../../shared/services/index-db/index-db-collect.service';

describe('PlantUploadComponent', () => {
  let component: PlantUploadComponent;
  let fixture: ComponentFixture<PlantUploadComponent>;
  let indexDbCollectService: jest.Mocked<IndexDbCollectService>;

  beforeEach(() => {
    // Mock setTimeout
    jest.useFakeTimers();

    const indexDbCollectServiceSpy = { addCollect: jest.fn() };

    TestBed.configureTestingModule({
      imports: [PlantUploadComponent],
      providers: [
        CollectService,

        { provide: IndexDbCollectService, useValue: indexDbCollectServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantUploadComponent);
    component = fixture.componentInstance;

    indexDbCollectService = TestBed.inject(
      IndexDbCollectService
    ) as jest.Mocked<IndexDbCollectService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
