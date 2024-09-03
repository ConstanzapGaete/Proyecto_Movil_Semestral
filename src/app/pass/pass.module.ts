import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PassPageRoutingModule } from './pass-routing.module';
import { PassPage } from './pass.page';
import { ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [PassPage]
})
export class PassPageModule {}
