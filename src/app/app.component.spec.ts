import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ClientService} from "./shared/client.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AppComponent', () => {
  let httpMock: HttpClientTestingModule
  let httpClient: HttpClient

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    httpMock = TestBed.get(HttpClientTestingModule)
    httpClient = TestBed.get(HttpClient)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'teamway'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('teamway');
  });

});
