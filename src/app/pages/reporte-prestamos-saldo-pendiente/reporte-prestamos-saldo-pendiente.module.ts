import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { ReportePrestamosSaldoPendientePageRoutingModule } from './reporte-prestamos-saldo-pendiente-routing.module';
import { ReportePrestamosSaldoPendientePage } from './reporte-prestamos-saldo-pendiente.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePrestamosSaldoPendientePageRoutingModule,
    TextAvatarModule
  ],
  declarations: [ReportePrestamosSaldoPendientePage]
})
export class ReportePrestamosSaldoPendientePageModule {}
