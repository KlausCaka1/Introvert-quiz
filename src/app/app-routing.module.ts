import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {QuizComponent} from "./quiz/quiz.component";
import {QuizResultsComponent} from "./quiz-results/quiz-results.component";

const ROUTES: Routes = [
  {path: '', component: QuizComponent},
  {path: 'results', component: QuizResultsComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    // enableTracing: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
