import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSmsPageRoutingModule } from './edit-sms-routing.module';

import { EditSmsPage } from './edit-sms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSmsPageRoutingModule
  ],
  declarations: [EditSmsPage]
})
export class EditSmsPageModule {}
