/* tslint:disable:prefer-const no-trailing-whitespace */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslationService} from './translation.service';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';

describe('TranslationService', () => {
    let service;
    let flashlight: Flashlight;
    let http: HTTP;

    beforeEach(() => {
        service = new TranslationService(flashlight, http);
    });

    it('should be created', () => {
        service = TestBed.get(TranslationService);
        expect(service).toBeTruthy();
    });

    it('should return an error', () => {
        spyOn(service.translate('a', 'morse'), 'catch');
        service.translate('a', '12345');
        expect(service.translate('a', 'morse').catch);
    });

    it('should run #translate()', async () => {
        const result = service.translateText('a', 'morse');
    });

    it('should run #translateText()', async () => {
        const result = service.translateText('a', 'morse');
    });

});
