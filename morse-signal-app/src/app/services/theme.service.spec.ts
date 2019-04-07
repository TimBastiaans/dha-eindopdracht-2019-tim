/* tslint:disable:no-trailing-whitespace prefer-const */
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';

describe('ThemeService', () => {
  let service;
  let document;

  beforeEach(() => {
    document = DOCUMENT;
    service = new ThemeService(document);
    } );

  it('should be created', () => {
    service = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });

});
