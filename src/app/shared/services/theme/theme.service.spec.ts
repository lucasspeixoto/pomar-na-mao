import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    themeService = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears all mocks to prevent interference between tests
  });

  it('creates service', () => {
    expect(themeService).toBeTruthy();
  });

  it('creates service', () => {
    expect(themeService).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(themeService.isCurrentThemeDark()).toBeFalsy();
  });

  describe('_getStoredTheme', () => {
    it('returns stored theme when colorScheme is dark', () => {
      const parsedStoredThemeObject = { colorTheme: 'forest' };

      jest.spyOn(JSON, 'parse').mockReturnValue(parsedStoredThemeObject);

      expect(themeService['_getStoredTheme']()).toBe('forest');
    });
  });

  describe('toggleColorTheme', () => {
    it('should call setColorTheme and _setStoredColorTheme when toggleColorTheme is called', () => {
      const setColorThemeSpy = jest
        .spyOn(themeService, 'setColorTheme')
        .mockImplementation(() => {});

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _setStoredColorThemeSpy = jest.spyOn<any, any>(
        themeService as ThemeService,
        '_setStoredColorTheme'
      );

      themeService.toggleColorTheme();

      expect(setColorThemeSpy).toHaveBeenCalledWith('forest');
      expect(_setStoredColorThemeSpy).toHaveBeenCalledWith('forest');
    });
  });
});
