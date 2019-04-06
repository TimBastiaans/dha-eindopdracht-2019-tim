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
    fontSize = 16;
    errorMessage: string[];

    constructor(private data: DataService,
                private theme: ThemeService,
                private nativeStorage: NativeStorage,
                private errorService: ErrorService) {
        this.data.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
        this.errorService.currentErrors.subscribe(error => this.errorMessage = error);
    }

    changeTheme(themeName: string) {
        this.theme.setTheme(themeName);
        this.setThemeInStorage(themeName);
    }

    changeFontSize(number: number) {
        this.data.changeFontSize(number);
        this.setFontInStorage();
    }

    setFontInStorage() {
        this.nativeStorage.setItem('fontSize', {fontsize: this.fontSize})
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





