import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysmsPageRoutingModule } from './mysms-routing.module';

import { MysmsPage } from './mysms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysmsPageRoutingModule
  ],
  declarations: [MysmsPage]
})
export class MysmsPageModule {}
