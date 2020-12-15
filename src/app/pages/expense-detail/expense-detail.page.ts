import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Expense } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
})
export class ExpenseDetailPage implements OnInit, OnDestroy {
  expenseForm: FormGroup;
  @Input() expense: Expense; 
  type: string;
  validation_messages = {
    concept: [
      { type:"required", message: "El concepto es requerido."}
    ],
    amount: [
      { type:"required", message: "El monto es requerido."}
    ]
  }
  
  constructor(public modalCtrl: ModalController,
              public expenseService: ExpensesService,
              private alertService: AlertService,
              private formBuilder: FormBuilder) {

    this.expenseForm = this.formBuilder.group({
      concept: new FormControl("", Validators.compose([
        Validators.required
      ])),
      amount: new FormControl("", Validators.compose([
        Validators.required
      ])),
      description: new FormControl("", Validators.compose([
        //Validators.required
      ])),
      createdAt: new FormControl(moment().format("YYYY-MM-DD HH:mm:ss")),
      id: new FormControl("")
    })
  }

  ngOnInit() {
    this.expenseForm.setValue(this.expense);
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal(updated) {

    this.modalCtrl.dismiss({
      'dismissed': updated
    });
  }

  updateExpense(){
    this.expenseService.updateExpense(this.expenseForm.value).then(res => this.dismissModal(true));
  }

}
