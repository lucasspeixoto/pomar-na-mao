import { TestBed } from '@angular/core/testing';
import { LoadingStore } from './loading-store';

describe('LoadingStore', () => {
  let service: LoadingStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingStore],
    });
    service = TestBed.inject(LoadingStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isLoading signal with false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should update isLoading signal when set', () => {
    // Initial state
    expect(service.isLoading()).toBe(false);

    // Set to true
    service.startLoading();
    expect(service.isLoading()).toBe(true);

    // Set back to false
    service.stopLoading();
    expect(service.isLoading()).toBe(false);
  });

  it('should update isLoading signal with update method', () => {
    // Initial state
    expect(service.isLoading()).toBe(false);

    // Update using a function
    service['_isLoading'].update(current => !current);
    expect(service.isLoading()).toBe(true);

    // Update again
    service['_isLoading'].update(current => !current);
    expect(service.isLoading()).toBe(false);
  });
});
