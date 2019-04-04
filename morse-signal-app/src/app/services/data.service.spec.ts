/* tslint:disable:prefer-const no-trailing-whitespace */
import { TestBed } from '@angular/core/testing';
import {DataService} from './data.service';

describe('DataService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = DataService;
  });


  it('should be created', () => {
    service = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should run #changeFontSize()', async () => {
     const result = service.changeFontSize(16);
  });

});

