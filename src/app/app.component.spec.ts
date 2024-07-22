import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DarkModeService } from './services/dark-mode.service';
import { Quizz } from './models/quizz.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let darkModeServiceMock: {
    toggleDarkMode: jest.Mock<void, []>;
    isDarkModeEnabled: jest.Mock<boolean, []>;
  };

  beforeEach(async () => {
    darkModeServiceMock = {
      toggleDarkMode: jest.fn(),
      isDarkModeEnabled: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: DarkModeService, useValue: darkModeServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should select a quiz', () => {
    const quiz: Quizz = {
      title: 'Sample Quiz',
      icon: 'sample-icon.png',
      questions: [],
    };
    component.onQuizSelected(quiz);
    expect(component.selectedQuiz).toEqual(quiz);
  });

  it('should restart a quiz', () => {
    component.selectedQuiz = {
      title: 'Sample Quiz',
      icon: 'sample-icon.png',
      questions: [],
    };
    component.onQuizRestarted();
    expect(component.selectedQuiz).toBeNull();
  });

  it('should toggle dark mode', () => {
    component.toggleDarkMode();
    expect(darkModeServiceMock.toggleDarkMode).toHaveBeenCalled();
  });

  it('should return the dark mode status', () => {
    darkModeServiceMock.isDarkModeEnabled.mockReturnValue(true);
    expect(component.isDarkModeEnabled()).toBe(true);
    expect(darkModeServiceMock.isDarkModeEnabled).toHaveBeenCalled();
  });
});
