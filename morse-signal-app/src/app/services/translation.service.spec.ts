/* tslint:disable:prefer-const no-trailing-whitespace */
import {TestBed} from '@angular/core/testing';
import {TranslationService} from './translation.service';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {ErrorService} from './error.service';
import {Platform} from '@ionic/angular';

describe('TranslationService', () => {
    let service;
    let flashlight: Flashlight;
    let http: HTTP;
    let platform: Platform;
    let errorService: ErrorService;

    beforeEach(() => {
        service = new TranslationService(flashlight, http, errorService, platform);
    });

    it('should be created', () => {
        service = TestBed.get(TranslationService);
        expect(service).toBeTruthy();
    });

    it('should catch on #translate()', () => {
        spyOn(service.translate('a', 'morse'), 'catch');
        service.translate('a', '12345');
        expect(service.translate('a', 'morse').catch);
    });

    it('should catch on #translate() because of non-existing language', () => {
        spyOn(service.translate('a', 'abcdefg'), 'catch');
        service.translate('a', 'abcdefg');
        expect(service.translate('a', 'abcdefg').catch);
    });

    it('should catch on #translateText()', async () => {
        spyOn(service.translateText('a', 'morse'), 'catch');
        service.translateText('a', '12345');
        expect(service.translateText('a', 'morse').catch());
    });

    it('should run #translate()', async () => {
        spyOn(service.translate('a', 'morse'), 'catch');
        service.translate('a', 'morse');
        expect(service.translate('a', 'morse'));
    });

    it('should run #translateText()', async () => {
        spyOn(service.translateText('a', 'morse'), 'catch');
        service.translateText('a', 'morse');
        expect(service.translateText('a', 'morse'));
    });

});
