import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyemailPage } from './myemail.page';

const routes: Routes = [
  {
    path: '',
    component: MyemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyemailPageRoutingModule {}
