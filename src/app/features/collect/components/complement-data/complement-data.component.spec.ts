/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementDataComponent } from './complement-data.component';
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

describe('ComplementDataComponent', () => {
  let component: ComplementDataComponent;
  let fixture: ComponentFixture<ComplementDataComponent>;
  let collectService: jest.Mocked<CollectService>;

  beforeEach(() => {
    const collectServiceMock = { insertAPlantCollectHandler: jest.fn() };

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
        { provide: CollectService, useValue: collectServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementDataComponent);
    component = fixture.componentInstance;

    collectService = TestBed.inject(CollectService) as jest.Mocked<CollectService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('should render register button title and disabled', () => {
      const registerButtonElement = fixture.nativeElement.querySelector('#registerButton');
      expect(registerButtonElement).toBeTruthy();
      expect(registerButtonElement.disabled).toBe(true);
      expect(registerButtonElement.textContent).toContain('Registrar');
    });
  });

  describe('form validates', () => {
    it('should initialize with empty form', () => {
      expect(component.collectComplementDataForm.get('mass')?.value).toBe('');
      expect(component.collectComplementDataForm.get('variety')?.value).toBe('');
      expect(component.collectComplementDataForm.get('plantingDate')?.value).toBe('');
      expect(component.collectComplementDataForm.get('harvest')?.value).toBe('');
      expect(component.collectComplementDataForm.get('description')?.value).toBe('');
    });

    it('should validate required fields', () => {
      const form = component.collectComplementDataForm;
      expect(form.valid).toBeFalsy();

      const massControl = form.controls.mass;
      expect(massControl?.errors?.['required']).toBeTruthy();
    });

    it('should validate mass field', () => {
      const massControl = component.collectComplementDataForm.controls.mass;

      component.collectComplementDataForm.patchValue({ mass: '-2' });
      expect(massControl?.errors).toBeTruthy();

      component.collectComplementDataForm.patchValue({ mass: '10' });
      expect(massControl?.errors).toBeFalsy();
    });

    it('should validate variety field', () => {
      const identifierControl = component.collectComplementDataForm.controls.variety;

      component.collectComplementDataForm.patchValue({ variety: 'A#' });
      expect(identifierControl?.errors).toBeTruthy();

      component.collectComplementDataForm.patchValue({ variety: 'A#213ag3' });
      expect(identifierControl?.errors).toBeFalsy();
    });

    it('should validate description field', () => {
      const descriptionControl = component.collectComplementDataForm.controls.description;

      component.collectComplementDataForm.patchValue({
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus eros aliquet convallis. Nulla facilisi. Sed non risus et velit efficitur cursus.',
      });
      expect(descriptionControl?.errors).toBeTruthy();

      component.collectComplementDataForm.patchValue({
        description: 'Planta com indicio de fungo',
      });
      expect(descriptionControl?.errors).toBeFalsy();
    });

    it('should enable register button when form is valid', () => {
      const registerButtonElement = fixture.nativeElement.querySelector('#registerButton');

      expect(registerButtonElement.disabled).toBe(true);

      component.collectComplementDataForm.patchValue({
        mass: '12',
      });

      fixture.detectChanges();

      expect(component.collectComplementDataForm.valid).toBeTruthy();
      expect(registerButtonElement.disabled).toBe(false);
    });
  });

  describe('behaviour', () => {
    it('should call insertAPlantCollectHandler when form is invalid and submit is clicked', () => {
      component.collectComplementDataForm.patchValue({
        mass: '123',
      });

      fixture.detectChanges();

      component.collectDataHandler();

      expect(collectService.insertAPlantCollectHandler).toHaveBeenCalled();
    });
  });
});
