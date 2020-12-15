import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewExpensePageRoutingModule } from './new-expense-routing.module';
import { NewExpensePage } from './new-expense.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExpensePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewExpensePage]
})
export class NewExpensePageModule {}
