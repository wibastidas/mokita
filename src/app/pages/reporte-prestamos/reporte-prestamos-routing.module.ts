import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportePrestamosPage } from './reporte-prestamos.page';


const routes: Routes = [
  {
    path: '',
    component: ReportePrestamosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePrestamosPageRoutingModule {}
