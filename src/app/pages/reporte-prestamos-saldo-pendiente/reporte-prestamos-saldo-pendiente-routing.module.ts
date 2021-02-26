import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePrestamosSaldoPendientePage } from './reporte-prestamos-saldo-pendiente.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePrestamosSaldoPendientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePrestamosSaldoPendientePageRoutingModule {}
