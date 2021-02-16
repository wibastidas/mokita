import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxGaugeModule } from 'ngx-gauge';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutePageRoutingModule } from './route-routing.module';
import { RoutePage } from './route.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RoutePageRoutingModule,
    NgxGaugeModule
  ],
  declarations: [RoutePage]
})
export class RoutePageModule {}
