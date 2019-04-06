/* tslint:disable:no-trailing-whitespace */
import {Component} from '@angular/core';
import {DataService} from '../services/data.service';
import {ThemeService} from '../services/theme.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ErrorService} from '../services/error.service';


@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
    private _fontSize: number;
    private _errorMessage: string[];

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

    constructor(private data: DataService, private theme: ThemeService,
                private nativeStorage: NativeStorage, private errorService: ErrorService) {
        this.fontSize = 16;
        this.setFontSize();
    }

    private setFontSize() {
        this.data.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
        this.errorService.currentErrors.subscribe(error => this.errorMessage = error);
    }

    changeTheme(themeName: string) {
        this.theme.setTheme(themeName);
        this.setThemeInStorage(themeName);
    }

    changeFontSize(fontSize: number) {
        this.data.changeFontSize(fontSize);
        this.setFontInStorage(fontSize);
    }

    setFontInStorage(fontSize: number) {
        this.nativeStorage.setItem('fontSize', {fontsize: fontSize})
            .then(
                () => console.log('Font-size Stored'),
                () => this.errorService.addError('Error storing fontSize')
            );
    }

    setThemeInStorage(themeName) {
        this.nativeStorage.setItem('theme', {themeName: themeName})
            .then(
                () => console.log('Font-size Stored'),
                () => this.errorService.addError('Error storing fontSize')
            );
    }
}





