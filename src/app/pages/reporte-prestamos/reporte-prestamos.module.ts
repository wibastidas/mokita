import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportePrestamosPageRoutingModule } from './reporte-prestamos-routing.module';
import { ReportePrestamosPage } from './reporte-prestamos.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextAvatarModule,
    SharedModule,
    ReportePrestamosPageRoutingModule
  ],
  declarations: [ReportePrestamosPage]
})
export class ReportePrestamosPageModule {}
