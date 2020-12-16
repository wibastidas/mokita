import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerDetailPageRoutingModule } from './customer-detail-routing.module';
import { CustomerDetailPage } from './customer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDetailPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CustomerDetailPage]
})
export class CustomerDetailPageModule {}
