import { TestBed } from '@angular/core/testing';
import { PlantUploadStore } from './plant-upload-store';

describe('PlantUploadStore', () => {
  let service: PlantUploadStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantUploadStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize plantPhotoString as empty string', () => {
    expect(service.plantPhotoString()).toBe('');
  });

  it('should initialize isLoading as false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should update plantPhotoString when set', () => {
    const testPhotoString = 'data:image/jpeg;base64,test123';
    service.plantPhotoString.set(testPhotoString);
    expect(service.plantPhotoString()).toBe(testPhotoString);
  });

  it('should update isLoading when set', () => {
    service.isLoading.set(true);
    expect(service.isLoading()).toBe(true);

    service.isLoading.set(false);
    expect(service.isLoading()).toBe(false);
  });
});
