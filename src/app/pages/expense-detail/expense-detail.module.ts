import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseDetailPageRoutingModule } from './expense-detail-routing.module';
import { ExpenseDetailPage } from './expense-detail.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ExpenseDetailPage]
})
export class ExpenseDetailPageModule {}
