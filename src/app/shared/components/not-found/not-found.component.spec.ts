import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;

  beforeEach(async () => {
    // Create router spy
    const routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateToLoginPage', () => {
    it('should navigate to login page', () => {
      // Act
      component.navigateToLoginPage();

      // Assert
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
