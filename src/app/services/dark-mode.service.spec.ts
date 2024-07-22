import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkModeService],
    });

    service = TestBed.inject(DarkModeService);

    // Mock localStorage
    const store: { [key: string]: string } = {};
    getItemSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string): string | null => {
        return store[key] || null;
      });
    setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation((key: string, value: string): void => {
        store[key] = value;
      });

    // Clear any existing class on body
    document.body.className = '';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with dark mode from localStorage', () => {
    getItemSpy.mockReturnValue('true');
    const newService = new DarkModeService();
    expect(newService.isDarkModeEnabled()).toBe(true);
    expect(document.body.classList).toContain('dark');
  });

  it('should toggle dark mode', () => {
    service.toggleDarkMode();
    expect(service.isDarkModeEnabled()).toBe(true);
    expect(setItemSpy).toHaveBeenCalledWith('darkMode', 'true');
    expect(document.body.classList).toContain('dark');

    service.toggleDarkMode();
    expect(service.isDarkModeEnabled()).toBe(false);
    expect(setItemSpy).toHaveBeenCalledWith('darkMode', 'false');
    expect(document.body.classList).not.toContain('dark');
  });

  it('should apply dark mode correctly', () => {
    service.toggleDarkMode();
    expect(document.body.classList).toContain('dark');

    service.toggleDarkMode();
    expect(document.body.classList).not.toContain('dark');
  });
});
