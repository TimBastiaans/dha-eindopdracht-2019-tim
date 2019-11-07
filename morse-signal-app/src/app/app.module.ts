import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ThemeService} from './services/theme/theme.service';
import {DataService} from './services/data/data.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Flashlight} from "@ionic-native/flashlight/ngx";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";



@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        ThemeService,
        DataService,
        NativeStorage,
        ScreenOrientation,
        Flashlight,
        SpeechRecognition,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
