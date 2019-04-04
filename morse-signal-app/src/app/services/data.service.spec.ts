/* tslint:disable:prefer-const no-trailing-whitespace */
import { TestBed} from '@angular/core/testing';
import {DataService} from './data.service';

describe('DataService', () => {
    let service;

    beforeEach(() => {
        service = DataService;
    });

    it('should be created', () => {
        service = TestBed.get(DataService);
        expect(service).toBeTruthy();
    });

});

