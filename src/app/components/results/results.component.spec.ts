import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { Quizz } from '../../models/quizz.model';
import { EventEmitter } from '@angular/core';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with input properties', () => {
    const testQuiz: Quizz = {
      title: 'JavaScript',
      icon: 'js-icon.png',
      questions: [],
    };
    component.quiz = testQuiz;
    component.score = 85;

    fixture.detectChanges();

    expect(component.quiz).toEqual(testQuiz);
    expect(component.score).toBe(85);
  });

  it('should emit restartQuiz event on restart', () => {
    const restartQuizSpy = jest.spyOn(component.restartQuiz, 'emit');

    component.restart();

    expect(restartQuizSpy).toHaveBeenCalled();
  });
});
