import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quizz } from '../../models/quizz.model';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css'],
})
export class QuizSelectionComponent implements OnInit {
  quizzes: Quizz[] = [];
  @Output() quizSelected = new EventEmitter<Quizz>();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data.quizzes;
    });
  }

  selectQuiz(quiz: Quizz): void {
    this.quizSelected.emit(quiz);
  }
}
