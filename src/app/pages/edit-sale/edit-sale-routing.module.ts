import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSalePage } from './edit-sale.page';

const routes: Routes = [
  {
    path: '',
    component: EditSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSalePageRoutingModule {}
