// tslint:disable
import {inject, TestBed} from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateTabPage} from './translate-tab.page';
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

describe('TranslateTabPage', () => {
    let fixture;
    let component;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TranslateTabPage
            ],
            providers: [
                SpeechRecognition,
                Flashlight,
                HTTP,
                TranslateTabPage,
                {provide: DataService, useClass: MockDataService},
                {provide: ThemeService, useClass: MockThemeService},
                NativeStorage,
                {provide: TranslationService, useClass: MockTranslationService},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(TranslateTabPage);
        component = fixture.debugElement.componentInstance;
    });

    it('should create a component', async () => {
        component = TestBed.get(TranslateTabPage);
        expect(component).toBeTruthy();
    });

});
