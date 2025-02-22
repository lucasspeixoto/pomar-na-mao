/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { ComplementDataComponent } from './complement-data.component';

describe('ComplementDataComponent', () => {
  let component: ComplementDataComponent;
  let fixture: ComponentFixture<ComplementDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComplementDataComponent],
      providers: [GeolocationService],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementDataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
