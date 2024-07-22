import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { Quizz, Result } from '../../models/quizz.model';
import { of } from 'rxjs';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select an answer', () => {
    const answer = 'Option A';
    component.selectAnswer(answer);
    expect(component.selectedAnswer).toBe(answer);
    expect(component.nullanswer).toBe('');
  });

  it('should submit an answer and update results and score', () => {
    const quiz: Quizz = {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is 2 + 2?',
          answer: '4',
          options: [],
        },
      ],
      icon: '',
    };
    component.quiz = quiz;
    component.selectedAnswer = '4';

    component.submitAnswer();

    expect(component.results.length).toBe(1);
    expect(component.results[0].question).toBe('What is 2 + 2?');
    expect(component.results[0].selectedAnswer).toBe('4');
    expect(component.results[0].correct).toBe(true);
    expect(component.score).toBe(1);
    expect(component.answerSubmitted).toBe(true);
    expect(component.nullanswer).toBe('');
  });

  it('should show validation message when no answer is selected', () => {
    component.selectedAnswer = null;
    component.submitAnswer();
    expect(component.nullanswer).toBe('Please select an answer.');
  });

  it('should move to the next question and show results at the end', () => {
    const quiz: Quizz = {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is 2 + 2?',
          answer: '4',
          options: [],
        },
        {
          question: 'What is 3 + 3?',
          answer: '6',
          options: [],
        },
      ],
      icon: '',
    };
    component.quiz = quiz;
    component.currentQuestionIndex = 0;

    component.nextQuestion();
    expect(component.currentQuestionIndex).toBe(1);
    expect(component.showResults).toBe(false);

    component.nextQuestion();
    expect(component.showResults).toBe(true);
  });

  it('should restart the quiz', () => {
    component.currentQuestionIndex = 1;
    component.results = [
      {
        question: 'What is 2 + 2?',
        selectedAnswer: '4',
        correctAnswer: '4',
        correct: true,
      },
    ];
    component.score = 1;
    component.showResults = true;

    component.restartQuiz();

    expect(component.currentQuestionIndex).toBe(0);
    expect(component.results.length).toBe(0);
    expect(component.showResults).toBe(false);
    expect(component.score).toBe(0);
    expect(component.selectedAnswer).toBe(null);
    expect(component.nullanswer).toBe('');
  });

  it('should return the correct class for quiz icons', () => {
    expect(component.getQuizClass('html')).toBe('html-quiz-icon');
    expect(component.getQuizClass('css')).toBe('css-quiz-icon');
    expect(component.getQuizClass('javascript')).toBe('javascript-quiz-icon');
    expect(component.getQuizClass('accessibility')).toBe(
      'accessibility-quiz-icon'
    );
    expect(component.getQuizClass('unknown')).toBe('');
  });
});
