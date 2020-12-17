import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleDetailPageRoutingModule } from './sale-detail-routing.module';
import { SaleDetailPage } from './sale-detail.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleDetailPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SaleDetailPage]
})
export class SaleDetailPageModule {}
