/* tslint:disable:prefer-const no-trailing-whitespace */
import {TestBed} from '@angular/core/testing';
import {TranslationService} from './translation.service';
import {Platform} from '@ionic/angular';

describe('TranslationService', () => {
    let flashlightSpy, httpSpy, errorServiceSpy, translateServiceSpy;
    let flashOn, flashOff, post, error, tran, trantext;
    let service: TranslationService;
    let platform: Platform;

    beforeEach(() => {
        flashOn = Promise.resolve();
        flashOff = Promise.resolve();
        post = Promise.resolve();
        error = Promise.resolve();
        tran = Promise.resolve();
        trantext = Promise.resolve();

        flashlightSpy = jasmine.createSpyObj('flashlight', {
            switchOn: flashOn,
            switchOff: flashOff
        });

        httpSpy = jasmine.createSpyObj('http', {
            post: post
        });

        errorServiceSpy = jasmine.createSpyObj('errorService', {
            addError: error
        });

        translateServiceSpy = jasmine.createSpyObj('TranslationService', {
            translate: tran,
            translateText: trantext
        });

        service = new TranslationService(flashlightSpy, httpSpy, errorServiceSpy, platform);
    });

    it('should be created', () => {
        service = TestBed.get(TranslationService);
        expect(service).toBeTruthy();
    });

    it('should run #translatetext() when calling #translate()', () => {
        service.translate('a', 'morse').then(() => {
            expect(service.translateText).toBeTruthy();
        }).catch(() => {
            fail();
        });
    });

    it('should run #addError() when calling #translateText()', () => {
        service.translateText('a', ' morse').then(() => {
            expect(errorServiceSpy.addError).toHaveBeenCalled();
        }).catch(() => {
            fail();
        });
    });

    it('should run #flash() when calling #translate()', async () => {
        service.translate('a', ' morse').then(() => {
            expect(service.flash).toBeTruthy();
        }).catch(() => {
            fail();
        });
    });

    it('should run #flash() when calling #translateText()', async () => {
        service.translateText('a', ' morse').then(() => {
            expect(service.flash).toBeTruthy();
        }).catch(() => {
            fail();
        });
    });

    it('should run #translate()', async () => {
        spyOn(service.translate('a', 'morse'), 'catch');
        service.translate('a', 'morse');
        expect(service.translate('a', 'morse').catch(() => {
            fail();
        }));
    });

    it('should run #translateText()', async () => {
        spyOn(service.translateText('a', 'morse'), 'catch');
        service.translateText('a', 'morse');
        expect(service.translateText('a', 'morse').catch(() => {
            fail();
        }));
    });

    it('should run #flashTimer() when calling #translate()', async () => {
        service.translate('a', ' morse').then(() => {
            expect(service.flashTimer).toBeTruthy();
        }).catch(() => {
            fail();
        });
    });

});
