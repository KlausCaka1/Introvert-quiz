import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Quiz} from "./client-model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  mockDataUrl = 'assets/quiz-mock-data.json'

  constructor(
    private http: HttpClient
  ) { }

  public getQuestions(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.mockDataUrl).pipe(
      map(res => res)
    )
  }
}
