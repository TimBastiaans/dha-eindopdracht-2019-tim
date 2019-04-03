/* tslint:disable:no-trailing-whitespace */
import {Component, OnInit} from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {DataService} from '../services/data.service';
import {ThemeService} from '../services/theme.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {TranslationService} from '../services/translation.service';
import {Camera, PictureSourceType} from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js';
import {ActionSheetController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    selectedImage: string;
    fontSize = 16;
    languages = ['Morse', 'Yoda', 'Pirate', 'Valspeak', 'Minion', 'Ferblatin',
        'Piglatin', 'Dothraki', 'Valyrian', 'Sindarin', 'Quenya', 'Orcish',
        'Sith', 'Cheunh', 'Gungan', 'Mandalorian', 'Huttese', 'Chef', 'Catalan',
        'Oldenglish', 'Shakespeare', 'Vulcan', 'Klingon', 'Romulan', 'Dovahzul',
        'Thuum', 'Aldmeris', 'Groot', 'Jive', 'Dolan', 'Fudd', 'Cockney', 'Us2uk',
        'Uk2us', 'Leetspeak', 'Brooklyn', 'Ermahgerd', 'Australian', 'Boston',
        'Austrian', 'Article_rewrite'];

    private _translation: Promise<string>;
    private _textToTranslate: string;
    private _chosenLanguage: string;
    private _displayText: string;

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

    constructor(private speechRecognition: SpeechRecognition, private flashlight: Flashlight,
                public http: HTTP, private data: DataService, private theme: ThemeService,
                private nativeStorage: NativeStorage, private translationService: TranslationService,
                private camera: Camera, private actionSheetCtrl: ActionSheetController,
                public platform: Platform) {
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

    async cameraOn() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Select Source',
            buttons: [{
                text: 'Capture Image',
                role: 'camera',
                icon: 'camera',
                handler: () => {
                    return this.getPicture(this.camera.PictureSourceType.CAMERA);
                }
            }, {
                text: 'Use Libary',
                role: 'libary',
                icon: 'folder-open',
                handler: () => {
                    return this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
            }]
        });
        await actionSheet.present();
    }

    getPicture(sourceType: PictureSourceType) {
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => this.selectedImage = `data:image/jpeg;base64,${imageData}`)
            .catch(err => alert(err));
    }

    recognizeImage() {
        Tesseract.recognize(this.selectedImage)
            .catch(err => alert(err))
            .then(result => {
                this.textToTranslate = result.text;
                alert(this.textToTranslate);
            })
            .finally(resultOrError => alert(resultOrError));
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

    onChange($event) {
        this.chosenLanguage = $event.target.value;
        console.log(this.chosenLanguage);
    }

    async clickTranslate() {
        this.displayText = await this.translationService.translate(this.textToTranslate, this.chosenLanguage);
    }

    setSettings() {
        this.nativeStorage.getItem('theme')
            .then(data => {
                    this.theme.setTheme(data.themeName);
                },
                error => console.log(error));
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


