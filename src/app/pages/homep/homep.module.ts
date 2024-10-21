import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepPageRoutingModule } from './homep-routing.module';

import { HomepPage } from './homep.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepPageRoutingModule,
    QrCodeModule,
  ],
  declarations: [HomepPage],
})
export class HomepPageModule {}
