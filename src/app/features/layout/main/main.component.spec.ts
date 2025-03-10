import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from '../../../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes, withViewTransitions()),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isCollapsed as false', () => {
    expect(component.isCollapsed).toBe(true);
  });

  it('should have menuItems defined', () => {
    expect(component.menuItems).toBeDefined();
    expect(Array.isArray(component.menuItems)).toBeTruthy();
    expect(component.menuItems.length).toEqual(3);
  });

  it('should inject AuthenticationService', () => {
    expect(component.authenticationService).toBeTruthy();
  });

  it('should inject LoadingService', () => {
    expect(component.loadingService).toBeTruthy();
  });
});
