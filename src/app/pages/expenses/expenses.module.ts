import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpensesPageRoutingModule } from './expenses-routing.module';
import { ExpensesPage } from './expenses.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ExpensesPage]
})
export class ExpensesPageModule {}
