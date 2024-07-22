import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuizSelectionComponent } from './quiz-selection.component';
import { QuizService } from '../../services/quiz.service';
import { Quizz } from '../../models/quizz.model';

describe('QuizSelectionComponent', () => {
  let component: QuizSelectionComponent;
  let fixture: ComponentFixture<QuizSelectionComponent>;
  let mockQuizService: jest.Mocked<QuizService>;

  beforeEach(async () => {
    // Create a mock QuizService
    mockQuizService = {
      getQuizzes: jest.fn().mockReturnValue(of({ quizzes: [] })),
    } as unknown as jest.Mocked<QuizService>;

    await TestBed.configureTestingModule({
      declarations: [QuizSelectionComponent],
      providers: [{ provide: QuizService, useValue: mockQuizService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quizzes on ngOnInit', () => {
    const mockQuizzes: Quizz[] = [
      { title: 'HTML Quiz', icon: 'html-icon.png', questions: [] },
      { title: 'CSS Quiz', icon: 'css-icon.png', questions: [] },
    ];
    mockQuizService.getQuizzes.mockReturnValue(of({ quizzes: mockQuizzes }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.quizzes).toEqual(mockQuizzes);
  });

  it('should emit quiz when selectQuiz is called', () => {
    const quiz: Quizz = {
      title: 'Mock Quiz Title',
      icon: 'mock-icon.png',
      questions: [],
    };
    component.quizSelected.subscribe((selectedQuiz) => {
      expect(selectedQuiz).toEqual(quiz);
    });
    component.selectQuiz(quiz);
  });

  it('should return correct class for quiz title', () => {
    expect(component.getQuizClass('html')).toBe('html-quiz-icon');
    expect(component.getQuizClass('css')).toBe('css-quiz-icon');
    expect(component.getQuizClass('javascript')).toBe('javascript-quiz-icon');
    expect(component.getQuizClass('accessibility')).toBe(
      'accessibility-quiz-icon'
    );
    expect(component.getQuizClass('unknown')).toBe('');
  });
});
