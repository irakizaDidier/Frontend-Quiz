import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import { Question } from '../../models/quizz.model';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit answerSelected when selectAnswer is called', () => {
    const answer = 'Option A';
    const answerSelectedSpy = jest.spyOn(component.answerSelected, 'emit');

    component.selectAnswer(answer);

    expect(answerSelectedSpy).toHaveBeenCalledWith(answer);
  });

  it('should emit submitAnswer when checkAnswer is called with selected answer', () => {
    component.selectedAnswer = 'Option A';
    const submitAnswerSpy = jest.spyOn(component.submitAnswer, 'emit');

    component.checkAnswer();

    expect(submitAnswerSpy).toHaveBeenCalled();
  });

  it('should show validation message when checkAnswer is called without selected answer', () => {
    component.selectedAnswer = null;

    component.checkAnswer();

    expect(component.nullanswer).toBe('Please select an answer');
  });

  it('should emit nextQuestion when nextQuestionHandler is called', () => {
    const nextQuestionSpy = jest.spyOn(component.nextQuestion, 'emit');

    component.nextQuestionHandler();

    expect(nextQuestionSpy).toHaveBeenCalled();
  });

  it('should calculate progress correctly', () => {
    component.currentQuestionIndex = 1;
    component.totalQuestions = 5;

    expect(component.getProgress()).toBe(40);
  });

  it('should correctly determine if the answer is correct', () => {
    const question: Question = {
      question: 'What is 2 + 2?',
      answer: '4',
      options: [],
    };
    component.question = question;

    expect(component.isCorrectAnswer('4')).toBe(true);
    expect(component.isCorrectAnswer('5')).toBe(false);
  });

  it('should correctly determine if the answer is selected', () => {
    component.selectedAnswer = 'Option A';

    expect(component.isSelectedAnswer('Option A')).toBe(true);
    expect(component.isSelectedAnswer('Option B')).toBe(false);
  });

  it('should correctly determine if the answer is incorrect', () => {
    const question: Question = {
      question: 'What is 2 + 2?',
      answer: '4',
      options: [],
    };
    component.question = question;
    component.selectedAnswer = '3';

    expect(component.isIncorrectAnswer('3')).toBe(true);
    expect(component.isIncorrectAnswer('4')).toBe(false);
  });
});
