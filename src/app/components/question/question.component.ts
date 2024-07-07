import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../models/quizz.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() question: Question | null = null;
  @Input() selectedAnswer: string | null = null;
  @Input() answerSubmitted: boolean = false;
  @Input() incorrectAnswerSelected: boolean = false;
  @Input() currentQuestionIndex: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() nullanswer: string = '';

  @Output() answerSelected = new EventEmitter<string>();
  @Output() submitAnswer = new EventEmitter<void>();
  @Output() nextQuestion = new EventEmitter<void>();

  selectAnswer(answer: string): void {
    if (!this.answerSubmitted) {
      this.nullanswer = '';
      this.answerSelected.emit(answer);
    }
  }

  isCorrectAnswer(option: string): boolean {
    if (!this.question) return false;
    return this.question.answer === option;
  }

  isSelectedAnswer(option: string): boolean {
    return this.selectedAnswer === option;
  }

  isIncorrectAnswer(option: string): boolean {
    if (!this.question) return false;
    return this.question.answer !== option && this.selectedAnswer === option;
  }

  getProgress(): number {
    return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
  }

  checkAnswer(): void {
    if (!this.answerSubmitted) {
      if (!this.selectedAnswer) {
        this.nullanswer = 'Please select an answer';
      } else {
        this.nullanswer = '';
        this.submitAnswer.emit();
      }
    }
  }

  nextQuestionHandler(): void {
    this.nextQuestion.emit();
  }
}
