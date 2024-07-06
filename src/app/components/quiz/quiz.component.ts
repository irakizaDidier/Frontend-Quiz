import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Quizz, Result } from '../../models/quizz.model';
import { DarkModeService } from '../../services/dark-mode.service';

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
  incorrectAnswerSelected: boolean = false;
  nullanswer = '';

  constructor(private darkModeService: DarkModeService) {}

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
      } else {
        this.incorrectAnswerSelected = true;
      }
      this.answerSubmitted = true;
    } else {
      this.nullanswer = 'Please select an answer.';
    }
  }

  nextQuestion(): void {
    this.answerSubmitted = false;
    this.incorrectAnswerSelected = false;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.quiz!.questions.length) {
      this.showResults = true;
    }
    this.selectedAnswer = null;
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.results = [];
    this.showResults = false;
    this.score = 0;
    this.nullanswer = '';
    this.quizRestarted.emit();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  isDarkModeEnabled(): boolean {
    return this.darkModeService.isDarkModeEnabled();
  }

  getProgress(): number {
    if (!this.quiz) return 0;
    return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100;
  }
}
