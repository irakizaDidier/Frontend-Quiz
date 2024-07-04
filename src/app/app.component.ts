import { Component } from '@angular/core';
import { Quizz } from './models/quizz.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedQuiz: Quizz | null = null;

  onQuizSelected(quiz: Quizz): void {
    this.selectedQuiz = quiz;
  }

  onQuizRestarted(): void {
    this.selectedQuiz = null;
  }
}
