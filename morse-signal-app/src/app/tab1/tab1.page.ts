/* tslint:disable:no-trailing-whitespace */
import {Component, OnInit} from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {DataService} from '../services/data.service';
import {ThemeService} from '../services/theme.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    morseUnitInterval = 250;
    fontSize = 16;

    private _displayTranslation: string;
    private _text: string;
    private _morse: string;
    private _textToTranslate: string;
    private _errorMessage: string;

    get text(): string { return this._text; }
    set text(value: string) {this._text = value; }

    get morse(): string {return this._morse; }
    set morse(value: string) {this._morse = value; }

    get textToTranslate(): string {return this._textToTranslate; }
    set textToTranslate(value: string) {this._textToTranslate = value; }

    get displayTranslation(): string {return this._displayTranslation; }
    set displayTranslation(value: string) {this._displayTranslation = value; }

    get errorMessage(): string {return this._errorMessage; }
    set errorMessage(value: string) {this._errorMessage = value; }

    constructor(private speechRecognition: SpeechRecognition, private flashlight: Flashlight,
                public http: HTTP, private data: DataService, private theme: ThemeService,
                private nativeStorage: NativeStorage) {
        this.data.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
    }

    ngOnInit() {
        this.setSettings();

        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission()
                        .then(
                            () => console.log('Granted'),
                            () => console.log('Denied')
                        );
                }
            });
    }

    translate() {
        this.http
            .post('https://api.funtranslations.com/translate/morse.json', {'text': this.text}, {})
            .then(translatedMorse => {
                const json = translatedMorse['data'];
                const obj = JSON.parse(json);
                this.displayTranslation = obj.contents.translated;
                this.morse = this.displayTranslation;
            })
            .catch(errorMessage => {
                const json = errorMessage['error'];
                const obj = JSON.parse(json);
                this.errorMessage = obj.error.message;
            });
    }





    speechOn() {
        this.speechRecognition.startListening()
            .subscribe(
                (matches: Array<string>) => {
                    console.log(matches);
                    this.textToTranslate = matches[0];
                }
            );
    }

    translateTextAndFlashMorse() {
        this.text = this.textToTranslate;
        this.translate();
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };
        const waitForTranslation = async () => {
            await sleep(2000);
            this.flash();
        };
        waitForTranslation();
    }

    private flash() {
        const wordList = this.morse.split('     ');
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

    setSettings() {
        this.nativeStorage.getItem('theme')
            .then(
                data => {
                this.theme.setTheme(data.themeName);
                },
                error => console.log(error)
            );
        this.nativeStorage.getItem('fontSize')
            .then(
                data => {
                    this.data.changeFontSize(data.fontSize);
                    this.fontSize = data.fontSize;
                },
                error => console.error(error)
            );
    }

    getStorage() {
        this.nativeStorage.setItem('theme', {themeName: 'night'})
            .then(
                () => this.theme.setTheme('night'),
                error => console.error('Error storing theme', error)
            );
    }
}


