import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { ReporteGastosPageRoutingModule } from './reporte-gastos-routing.module';
import { ReporteGastosPage } from './reporte-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteGastosPageRoutingModule,
    TextAvatarModule
  ],
  declarations: [ReporteGastosPage]
})
export class ReporteGastosPageModule {}
