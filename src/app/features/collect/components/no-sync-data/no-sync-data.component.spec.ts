/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSyncDataComponent } from './no-sync-data.component';

describe('NoSyncDataComponent', () => {
  let component: NoSyncDataComponent;
  let fixture: ComponentFixture<NoSyncDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoSyncDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSyncDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
