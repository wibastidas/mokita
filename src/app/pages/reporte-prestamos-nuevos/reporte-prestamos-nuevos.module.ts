import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportePrestamosNuevosPageRoutingModule } from './reporte-prestamos-nuevos-routing.module';
import { ReportePrestamosNuevosPage } from './reporte-prestamos-nuevos.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextAvatarModule,
    SharedModule,
    ReportePrestamosNuevosPageRoutingModule
  ],
  declarations: [ReportePrestamosNuevosPage]
})
export class ReportePrestamosNuevosPageModule {}
