import {async, inject, TestBed} from '@angular/core/testing';

import { ClientService } from './client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientService);
  });

  it(`should create`, async(inject([HttpTestingController, ClientService],
    (httpClient: HttpTestingController, apiService: ClientService) => {
      expect(apiService).toBeTruthy();
    })));
});
