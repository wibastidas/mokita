import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReporteGastosPageRoutingModule } from './reporte-gastos-routing.module';
import { ReporteGastosPage } from './reporte-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteGastosPageRoutingModule,
    TextAvatarModule,
    SharedModule
  ],
  declarations: [ReporteGastosPage]
})
export class ReporteGastosPageModule {}
