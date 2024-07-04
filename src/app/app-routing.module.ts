import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizSelectionComponent } from './components/quiz-selection/quiz-selection.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: '/quiz-selection', pathMatch: 'full' },
  { path: 'quiz-selection', component: QuizSelectionComponent },
  { path: 'quiz/:id', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
