import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Quizz } from '../../models/quizz.model';
import { Result } from '../../models/quizz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  @Input() quiz: Quizz | null = null;
  @Output() quizRestarted = new EventEmitter<void>();
  currentQuestionIndex: number = 0;
  results: Result[] = [];
  showResults: boolean = false;
  selectedAnswer: string | null = null;
  score: number = 0;
  answerSubmitted: boolean = false;
  nullanswer = '';

  constructor() {}

  ngOnInit(): void {}

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.nullanswer = '';
  }

  submitAnswer(): void {
    if (this.selectedAnswer !== null && this.quiz !== null) {
      const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      const isCorrect = currentQuestion.answer === this.selectedAnswer;
      this.results.push({
        question: currentQuestion.question,
        selectedAnswer: this.selectedAnswer,
        correctAnswer: currentQuestion.answer,
        correct: isCorrect,
      });
      if (isCorrect) {
        this.score++;
      }
      this.answerSubmitted = true;

      setTimeout(() => {
        this.answerSubmitted = false;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.quiz!.questions.length) {
          this.showResults = true;
        }
        this.selectedAnswer = null;
      }, 1000);
    } else {
      this.nullanswer = 'Please select an answer.';
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.results = [];
    this.showResults = false;
    this.score = 0;
    this.nullanswer = '';
    this.quizRestarted.emit();
  }

  isCorrectAnswer(option: string): boolean {
    if (!this.results[this.currentQuestionIndex]) return false;
    return this.results[this.currentQuestionIndex].correctAnswer === option;
  }

  isSelectedAnswer(option: string): boolean {
    if (!this.results[this.currentQuestionIndex]) return false;
    return this.results[this.currentQuestionIndex].selectedAnswer === option;
  }

  isIncorrectAnswer(option: string): boolean {
    if (!this.results[this.currentQuestionIndex]) return false;
    return (
      this.results[this.currentQuestionIndex].correctAnswer !== option &&
      this.results[this.currentQuestionIndex].selectedAnswer === option
    );
  }

  isCorrectAnswerForQuestion(option: string): boolean {
    if (!this.quiz || !this.quiz.questions[this.currentQuestionIndex])
      return false;
    return this.quiz.questions[this.currentQuestionIndex].answer === option;
  }
}
