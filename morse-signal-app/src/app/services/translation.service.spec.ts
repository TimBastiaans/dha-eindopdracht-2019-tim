/* tslint:disable:prefer-const no-trailing-whitespace */
import {TestBed} from '@angular/core/testing';

import {TranslationService} from './translation.service';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';

describe('TranslationService', () => {
    let flashlight;
    let http;
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        http = HTTP;
        flashlight = Flashlight;
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

    // it('#translate should return value from a promise',
    //     (done: DoneFn) => {
    //         service.translate('a', 'morse').then(value => {
    //             expect(value).toBe('undefined');
    //             done();
    //         });
    //     });

    it('should run #translate()', async () => {
        const result = service.translate('a', 'morse');
    });

    it('should run #translateText()', async () => {
        const result = service.translateText('a', 'morse');
    });

    // need to mock flaslight
    it('should run #flash()', async () => {
        const result = service.flash('.-');
    });

    it('should run #flashTimer()', async () => {
        const result = service.flashTimer(100);
    });

});
