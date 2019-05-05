/* tslint:disable:no-trailing-whitespace */
import {Injectable} from '@angular/core';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {ErrorService} from './error.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private _morseUnitInterval: number;
    private _fontSize: number;
    private _translation: string;

    get fontSize(): number {
        return this._fontSize;
    }

    set fontSize(value: number) {
        this._fontSize = value;
    }
    get morseUnitInterval(): number {
        return this._morseUnitInterval;
    }

    set morseUnitInterval(value: number) {
        this._morseUnitInterval = value;
    }
    get translation(): string {
        return this._translation;
    }

    set translation(value: string) {
        this._translation = value;
    }

    constructor(private flashlight: Flashlight, public http: HTTP,
                private errorService: ErrorService, private platform: Platform) {
        this.fontSize = 16;
        this.morseUnitInterval = 250;
    }

    async translate(textToTranslate: string, chosenLanguage: string) {
        await this.translateText(textToTranslate, chosenLanguage);
        return this.translation;
    }

    async translateText(textToTranslate: string, chosenLanguage: string) {
        if (chosenLanguage === undefined) {
            chosenLanguage = 'yoda';
        }
        await this.http
            .post('https://api.funtranslations.com/translate/' + chosenLanguage.toLowerCase() + '.json',
                {'text': textToTranslate}, {})
            .then(async translation => {
                const json = translation['data'];
                const obj = JSON.parse(json);
                this.translation = await obj.contents.translated;
                if (chosenLanguage.toLocaleLowerCase() === 'morse') {
                   if (!this.platform.is('android') && !this.platform.is('ios')) {
                        this.errorService.addError('Camera Flash is not available.');
                    } else {
                        await this.flash(this.translation);
                    }
                }
            })
            .catch(() => {
                this.errorService.addError('Too many requests. Try again later.');
            });
    }

    flash(morse: string) {
        const wordList = morse.split('     ');
        for (const word of wordList) {
            for (const character of word) {
                this.flashTimer(this.morseUnitInterval);
                switch (character) {
                    case '.': {
                        this.flashlight.switchOn();
                        this.flashTimer(this.morseUnitInterval);
                        break;
                    }
                    case '-': {
                        this.flashlight.switchOn();
                        this.flashTimer(this.morseUnitInterval * 3);
                        break;
                    }
                    case ' ': {
                        this.flashTimer(this.morseUnitInterval * 3);
                        break;
                    }
                }
            }
            this.flashTimer(this.morseUnitInterval * 7);
        }
        this.flashlight.switchOff();
    }

    flashTimer(intervalTime: number) {
        const start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > intervalTime) {
                this.flashlight.switchOff();
                break;
            }
        }
    }
}
