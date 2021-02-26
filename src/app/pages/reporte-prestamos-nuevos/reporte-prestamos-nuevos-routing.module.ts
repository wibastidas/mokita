import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportePrestamosNuevosPage } from './reporte-prestamos-nuevos.page';


const routes: Routes = [
  {
    path: '',
    component: ReportePrestamosNuevosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePrestamosNuevosPageRoutingModule {}
