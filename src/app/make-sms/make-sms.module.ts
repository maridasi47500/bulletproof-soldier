import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MakeSmsPageRoutingModule } from './make-sms-routing.module';

import { MakeSmsPage } from './make-sms.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeSmsPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [MakeSmsPage]
})
export class MakeSmsPageModule {}
