/* tslint:disable:no-trailing-whitespace */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {Flashlight} from '@ionic-native/flashlight/ngx';;
import {DataService} from '../services/data/data.service';
import {ThemeService} from '../services/theme/theme.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {TranslationService} from '../services/translation/translation.service';
import {ErrorService} from '../services/error/error.service';
import {HttpClient} from "@angular/common/http";


@Component({
    templateUrl: 'translate-tab.page.html',
    selector: 'app-translate-tab',
    styleUrls: ['translate-tab.page.scss']
})
export class TranslateTabPage implements OnInit {
    private _fontSize: number;
    private _languages: string[];
    private _translation: Promise<string>;
    private _textToTranslate: string;
    private _chosenLanguage: string;
    private _displayText: string;
    private _errorMessage: string[];
    theDate = new Date();

    get errorMessage(): string[] {
        return this._errorMessage;
    }

    set errorMessage(value: string[]) {
        this._errorMessage = value;
    }

    get fontSize(): number {
        return this._fontSize;
    }

    set fontSize(value: number) {
        this._fontSize = value;
    }

    get languages(): string[] {
        return this._languages;
    }

    set languages(value: string[]) {
        this._languages = value;
    }

    get textToTranslate(): string {
        return this._textToTranslate;
    }

    set textToTranslate(value: string) {
        this._textToTranslate = value;
    }

    get translation(): Promise<string> {
        return this._translation;
    }

    set translation(value: Promise<string>) {
        this._translation = value;
    }

    get chosenLanguage(): string {
        return this._chosenLanguage;
    }

    set chosenLanguage(value: string) {
        this._chosenLanguage = value;
    }

    get displayText(): string {
        return this._displayText;
    }

    set displayText(value: string) {
        this._displayText = value;
    }

    constructor(private speechRecognition: SpeechRecognition, private flashlight: Flashlight, private http: HttpClient,
                private data: DataService, private theme: ThemeService, private nativeStorage: NativeStorage,
                private translationService: TranslationService, private errorService: ErrorService) {
    }

    ngOnInit() {
        this.fontSize = 16;
        this.setSettings();
        this.setFontSize();
        this.languages = ['Morse', 'Yoda', 'Pirate', 'Valspeak', 'Minion', 'Ferblatin',
            'Piglatin', 'Dothraki', 'Valyrian', 'Sindarin', 'Quenya', 'Orcish',
            'Sith', 'Cheunh', 'Gungan', 'Mandalorian', 'Huttese', 'Chef', 'Catalan',
            'Oldenglish', 'Shakespeare', 'Vulcan', 'Klingon', 'Romulan', 'Dovahzul',
            'Thuum', 'Aldmeris', 'Groot', 'Jive', 'Dolan', 'Fudd', 'Cockney', 'Us2uk',
            'Uk2us', 'Leetspeak', 'Brooklyn', 'Ermahgerd', 'Australian', 'Boston',
            'Austrian', 'Article_rewrite'];
    }

    private setFontSize() {
        this.data.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
        this.errorService.currentErrors.subscribe(error => this.errorMessage = error);
    }

    private askSpeechPermission() {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission()
                        .then(
                            () => console.log('Granted'),
                            () => this.errorService.addError('No permission granted on microphone')
                        );
                }
            });
    }

    speechOn() {
        this.askSpeechPermission();
        this.speechRecognition.startListening()
            .subscribe(
                (matches: Array<string>) => {
                    this.textToTranslate = matches[0];
                }
            );
    }

    onChange($event) {
        this.chosenLanguage = $event.target.value;
    }

    async clickTranslate() {
        this.displayText = await this.translationService.translate(this.textToTranslate, this.chosenLanguage);
    }

    setSettings() {
        this.nativeStorage.getItem('theme')
            .then(data => {
                    this.theme.setTheme(data.themeName);
                },
                () => {
                    this.errorService.addError('No preferred theme found!');
                });

        this.nativeStorage.getItem('fontSize')
            .then(
                data => {
                    this.data.changeFontSize(data.fontSize);
                    this.fontSize = data.fontSize;
                },
                () => {
                    this.errorService.addError('No preferred fontsize found!');
                    this.data.changeFontSize(16);
                }
            );
    }

    protected adjustTextarea(event: any): void {
        const textarea: any = event.target;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        return;
    }

    onRemovedError(error: string) {
        this.errorService.removeError(error);
    }
}


