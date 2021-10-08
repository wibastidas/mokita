import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewCustomerPageRoutingModule } from './new-customer-routing.module';
import { NewCustomerPage } from './new-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCustomerPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [NewCustomerPage],
  exports: [NewCustomerPage]
})
export class NewCustomerPageModule {}
