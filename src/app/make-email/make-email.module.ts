import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MakeEmailPageRoutingModule } from './make-email-routing.module';

import { MakeEmailPage } from './make-email.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeEmailPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [MakeEmailPage]
})
export class MakeEmailPageModule {}
