import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSmsPage } from './edit-sms.page';

const routes: Routes = [
  {
    path: '',
    component: EditSmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSmsPageRoutingModule {}
