// tslint:disable
import {TestBed} from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Tab1Page} from './tab1.page';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {Flashlight} from '@ionic-native/flashlight/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {DataService} from '../services/data.service';
import {ThemeService} from '../services/theme.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {TranslationService} from '../services/translation.service';

@Injectable()
class MockDataService {
}

@Injectable()
class MockThemeService {
}

@Injectable()
class MockTranslationService {
}

describe('Tab1Page', () => {
    let fixture;
    let component;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                Tab1Page
            ],
            providers: [
                SpeechRecognition,
                Flashlight,
                HTTP,
                {provide: DataService, useClass: MockDataService},
                {provide: ThemeService, useClass: MockThemeService},
                NativeStorage,
                {provide: TranslationService, useClass: MockTranslationService},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(Tab1Page);
        component = fixture.debugElement.componentInstance;
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #askSpeechPermission()', async () => {
        component.askSpeechPermission();
        expect(component.askSpeechPermission());
    });

    it('should run #speechOn()', async () => {
        component.speechOn();
        expect(component.speechOn());
    });

    it('should run #clickTranslate()', async () => {
        component.clickTranslate();
        expect(component.clickTranslate());
    });

    it('should catch on #setSettings()', async () => {
        spyOn(component.clickTranslate(), 'catch');
        component.clickTranslate();
        expect(component.clickTranslate().catch);
    });

});
