import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Quizz, Result } from '../../models/quizz.model';

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
      this.nullanswer = '';
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
    this.nullanswer = '';
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.results = [];
    this.showResults = false;
    this.score = 0;
    this.selectedAnswer = null;
    this.nullanswer = '';
    this.quizRestarted.emit();
  }

  getQuizClass(title: string): string {
    switch (title.toLowerCase()) {
      case 'html':
        return 'html-quiz-icon';
      case 'css':
        return 'css-quiz-icon';
      case 'javascript':
        return 'javascript-quiz-icon';
      case 'accessibility':
        return 'accessibility-quiz-icon';
      default:
        return '';
    }
  }
}
