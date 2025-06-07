import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPwaButton } from './install-pwa-button';

describe('InstallPwaButton', () => {
  let component: InstallPwaButton;
  let fixture: ComponentFixture<InstallPwaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallPwaButton],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallPwaButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
