/* tslint:disable:no-trailing-whitespace */
import {Injectable} from '@angular/core';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    morseUnitInterval = 250;
    fontSize = 16;

    private _translation: string;

    get translation(): string {
        return this._translation;
    }

    set translation(value: string) {
        this._translation = value;
    }

    constructor(private flashlight: Flashlight, public http: HTTP) {
    }

    async translate(textToTranslate: string, chosenLanguage: string) {
        await this.translateTextWithApi(textToTranslate, chosenLanguage);
        return this.translation;
    }

    private async translateTextWithApi(textToTranslate: string, chosenLanguage: string) {
        await this.http
            .post('https://api.funtranslations.com/translate/' + chosenLanguage + '.json', {'text': textToTranslate}, {})
            .then(async translation => {
                const json = translation['data'];
                const obj = JSON.parse(json);
                this.translation = await obj.contents.translated;
                if (chosenLanguage.toLocaleLowerCase() === 'morse') {
                    await this.flash();
                }
            })
            .catch(errorMessage => {
                const json = errorMessage['error'];
                const obj = JSON.parse(json);
                console.log(errorMessage);
            });
    }

    private flash() {
        const wordList = this.translation.split('     ');
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

    private flashTimer(intervalTime: number) {
        const start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > intervalTime) {
                this.flashlight.switchOff();
                break;
            }
        }
    }
}