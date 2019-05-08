/* tslint:disable:no-trailing-whitespace prefer-const */
import {TestBed} from '@angular/core/testing';
import {ThemeService} from './theme.service';
import {DOCUMENT} from '@angular/common';
import * as Color from 'color';

describe('ThemeService', () => {
    let service, document, theme, variable, contr, globalCss, sty, dark, light;
    let themeSpy, documentSpy, colorSpy;

    beforeEach(() => {
        document = DOCUMENT;
        theme = Promise.resolve();
        variable = Promise.resolve();
        contr = Promise.resolve();
        globalCss = Promise.resolve();
        sty = Promise.resolve();
        light = Promise.resolve();
        dark = Promise.resolve();

        themeSpy = jasmine.createSpyObj('ThemeService', {
            setTheme: theme,
            setVariable: variable,
            contrast: contr,
            setGlobalCSS: globalCss
        });

        documentSpy = jasmine.createSpyObj('document', {
            style: sty
        });

        colorSpy = jasmine.createSpyObj('Color', {
            Lighten: light,
            darken: dark
        });

        service = new ThemeService(documentSpy);
    });

    it('should be created', () => {
        service = TestBed.get(ThemeService);
        expect(service).toBeTruthy();
    });

});
