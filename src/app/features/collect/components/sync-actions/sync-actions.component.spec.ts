/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncActionsComponent } from './sync-actions.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SyncActionsComponent', () => {
  let component: SyncActionsComponent;
  let fixture: ComponentFixture<SyncActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SyncActionsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
