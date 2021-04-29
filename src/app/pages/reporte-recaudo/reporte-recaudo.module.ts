import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextAvatarModule } from 'src/app/directives/text-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReporteRecaudoPageRoutingModule } from './reporte-recaudo-routing.module';
import { ReporteRecaudoPage } from './reporte-recaudo.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteRecaudoPageRoutingModule,
    TextAvatarModule,
    SharedModule,
  ],
  declarations: [ReporteRecaudoPage]
})
export class ReporteRecaudoPageModule {}
