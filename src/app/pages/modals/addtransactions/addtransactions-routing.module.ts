import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtransactionsPage } from './addtransactions.page';

const routes: Routes = [
  {
    path: '',
    component: AddtransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtransactionsPageRoutingModule {}
