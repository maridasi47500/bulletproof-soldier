import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditSmsPageRoutingModule } from './edit-sms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditSmsPage } from './edit-sms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule, 
    EditSmsPageRoutingModule
  ],
  declarations: [EditSmsPage]
})
export class EditSmsPageModule {}
