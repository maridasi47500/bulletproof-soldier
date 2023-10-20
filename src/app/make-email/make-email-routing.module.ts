import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeEmailPage } from './make-email.page';

const routes: Routes = [
  {
    path: '',
    component: MakeEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeEmailPageRoutingModule {}
