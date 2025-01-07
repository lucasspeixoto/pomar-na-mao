import { TestBed } from '@angular/core/testing';
import { DetectionComponent } from './detection.component';

describe('DetectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetectionComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DetectionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
