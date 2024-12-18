import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewSalePageRoutingModule } from './new-sale-routing.module';
import { NewSalePage } from './new-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSalePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewSalePage],
  exports: [NewSalePage]
})
export class NewSalePageModule {}
