import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorHandlerComponent} from './error-handler.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule],
    declarations: [ErrorHandlerComponent],
    exports: [ErrorHandlerComponent],
})
export class ComponentModule {}
