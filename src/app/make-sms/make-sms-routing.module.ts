import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeSmsPage } from './make-sms.page';

const routes: Routes = [
  {
    path: '',
    component: MakeSmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeSmsPageRoutingModule {}
