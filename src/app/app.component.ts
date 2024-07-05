import { Component } from '@angular/core';
import { Quizz } from './models/quizz.model';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedQuiz: Quizz | null = null;

  constructor(private darkModeService: DarkModeService) {}

  onQuizSelected(quiz: Quizz): void {
    this.selectedQuiz = quiz;
  }

  onQuizRestarted(): void {
    this.selectedQuiz = null;
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  isDarkModeEnabled(): boolean {
    return this.darkModeService.isDarkModeEnabled();
  }
}
