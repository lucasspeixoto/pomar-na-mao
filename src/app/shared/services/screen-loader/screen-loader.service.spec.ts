import { TestBed } from '@angular/core/testing';
import { ScreenLoaderService } from './screen-loader.service';

describe('ScreenLoaderService', () => {
  let screenLoaderService: ScreenLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenLoaderService],
    });
    screenLoaderService = TestBed.inject(ScreenLoaderService);
  });

  it('creates service', () => {
    expect(screenLoaderService).toBeTruthy();
  });

  it('should set loading state to true when isloading is true', () => {
    const setLoadingSpy = jest
      .spyOn(screenLoaderService, 'setLoading')
      .mockImplementation(() => {});

    screenLoaderService.setLoading(true);

    expect(setLoadingSpy).toHaveBeenCalledTimes(1);
    expect(screenLoaderService.isLoading).toBe(true);
  });

  it('should set loadingText when setLoadingText method is called with some text', () => {
    const setLoadingTextSpy = jest
      .spyOn(screenLoaderService, 'setLoadingText')
      .mockImplementation(() => {});

    screenLoaderService.setLoadingText('Carregando...');

    expect(setLoadingTextSpy).toHaveBeenCalledTimes(1);
    expect(screenLoaderService.loadingText).toBe('Carregando...');
  });
});
