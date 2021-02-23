import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddtransactionsPageRoutingModule } from './addtransactions-routing.module';
import { AddtransactionsPage } from './addtransactions.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtransactionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddtransactionsPage]
})
export class AddtransactionsPageModule {}
