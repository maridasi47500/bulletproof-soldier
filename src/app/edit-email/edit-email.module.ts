import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEmailPageRoutingModule } from './edit-email-routing.module';

import { EditEmailPage } from './edit-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEmailPageRoutingModule
  ],
  declarations: [EditEmailPage]
})
export class EditEmailPageModule {}
