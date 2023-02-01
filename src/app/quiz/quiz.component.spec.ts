import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ClientService} from "../shared/client.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {interval, Observable, of} from "rxjs";
import {Quiz} from "../shared/client-model";
import {QUIZ} from "../../assets/mock/data-mock";

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let httpMock: HttpClientTestingModule
  let httpController: HttpTestingController
  let httpClient: HttpClient;
  let service: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule],
      declarations: [ QuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpClientTestingModule)
    httpClient = TestBed.get(HttpClient)
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ClientService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nrQuestion type should number', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.nrQuestion).toBeInstanceOf(Number)
  })

  it('points type should be number[]', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.points).toBeInstanceOf(Array<number>)
  })

  it('nrQuestion should be lowered', () => {
    service.getQuestions().subscribe(res => {
      component.nrQuestion = res.length;
      component.goToPreviousQuestion()
      console.log(component.nrQuestion)
      expect(component.nrQuestion).toBeLessThan(res.length)
    })
    const req = httpController.expectOne('assets/quiz-mock-data.json');

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(QUIZ));
  })
});
