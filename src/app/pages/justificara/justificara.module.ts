import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificaraPageRoutingModule } from './justificara-routing.module';

import { JustificaraPage } from './justificara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificaraPageRoutingModule
  ],
  declarations: [JustificaraPage]
})
export class JustificaraPageModule {}
