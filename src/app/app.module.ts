import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuizSelectionComponent } from './components/quiz-selection/quiz-selection.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './components/question/question.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [AppComponent, QuizSelectionComponent, QuizComponent, QuestionComponent, ResultsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
