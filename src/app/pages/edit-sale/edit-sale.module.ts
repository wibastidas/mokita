import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditSalePageRoutingModule } from './edit-sale-routing.module';
import { EditSalePage } from './edit-sale.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSalePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [EditSalePage]
})
export class EditSalePageModule {}
