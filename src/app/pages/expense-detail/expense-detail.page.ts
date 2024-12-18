import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Expense } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';

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
              public authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService,
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
      adminId: "",
      createdBy: "",
      createdAt: new FormControl(moment(new Date()).format("MM/DD/YYYY")),
      updatedAt: new FormControl(moment(new Date()).format("MM/DD/YYYY")),
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
    this.expense.updatedAt =  moment(new Date()).format("MM/DD/YYYY");
    this.expenseService.updateExpense(this.expenseForm.value).then(res => this.dismissModal(true));
  }

}
