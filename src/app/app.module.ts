import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuizSelectionComponent } from './components/quiz-selection/quiz-selection.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, QuizSelectionComponent, QuizComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
