import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quizz } from '../../models/quizz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() quiz: Quizz | null = null;
  @Input() score: number = 0;

  @Output() restartQuiz = new EventEmitter<void>();

  restart(): void {
    this.restartQuiz.emit();
  }
}
