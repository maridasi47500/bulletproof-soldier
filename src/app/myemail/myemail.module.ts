import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyemailPageRoutingModule } from './myemail-routing.module';

import { MyemailPage } from './myemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyemailPageRoutingModule
  ],
  declarations: [MyemailPage]
})
export class MyemailPageModule {}
