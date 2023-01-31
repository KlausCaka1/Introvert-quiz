import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {QuizComponent} from './quiz/quiz.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {QuizResultsComponent} from './quiz-results/quiz-results.component';
import {FormsModule} from "@angular/forms";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ClientService} from "./shared/client.service";

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
