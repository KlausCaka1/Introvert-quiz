import {async, ComponentFixture, inject, TestBed, tick} from '@angular/core/testing';

import {ClientService} from './client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Quiz} from "./client-model";
import {of} from "rxjs";
import {QuizComponent} from "../quiz/quiz.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {QUIZ} from "../../assets/mock/data-mock";


describe('ClientService', () => {
  let service: ClientService;
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<QuizComponent>;
  let component: QuizComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(QuizComponent);
    httpController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance
    service = TestBed.inject(ClientService);
  });

  it(`should create`, async(inject([HttpTestingController, ClientService],
    (httpClient: HttpTestingController, apiService: ClientService) => {
      expect(apiService).toBeTruthy();
    })));

  it('mockUrl should have exact url', () => {
    const mockDataUrl = service.mockDataUrl;
    expect(mockDataUrl).toEqual('assets/quiz-mock-data.json')
  });

  it('Nr question have to be 5', () => {

    service.getQuestions()
      .subscribe(questions => {
        expect(questions.length).toBe(5 );
      });

    const req = httpController.expectOne('assets/quiz-mock-data.json');

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(QUIZ));

  });

  it('Data should be type of Quiz', () => {
    service.getQuestions().subscribe(questions => {
      expect(questions).toBeInstanceOf(Array<Quiz>)
    })

    const req = httpController.expectOne('assets/quiz-mock-data.json');

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(QUIZ));
  })
});
