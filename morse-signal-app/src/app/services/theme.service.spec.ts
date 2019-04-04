/* tslint:disable:no-trailing-whitespace */
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';

describe('ThemeService', () => {
  let service;
  let document;
  let color;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    color = Color;
    document = DOCUMENT;
    service = new ThemeService(document);
    } );

  it('should be created', () => {
    service = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should run #contrast()', async () => {
    const result = service.contrast('#3880ff');
  });

  it('should run #CSSTextGenerator()', async () => {
    const result = service.CSSTextGenerator('#3880ff');
  });

});
