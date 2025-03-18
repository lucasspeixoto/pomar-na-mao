import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        MainComponent,
        NzTypographyModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        NzDrawerModule,
        NzToolTipModule,
        NzButtonModule,
        LoadingComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
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
