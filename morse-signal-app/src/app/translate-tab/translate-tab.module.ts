import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateTabPage } from './translate-tab.page';
import {ComponentModule} from '../error-handler/component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild([{ path: '', component: TranslateTabPage }])
  ],
  declarations: [TranslateTabPage]
})
export class TranslateTabModule {}
