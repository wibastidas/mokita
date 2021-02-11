import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Expense } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventorService } from 'src/app/services/eventor.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit, OnDestroy {
  expense: Expense[];
  expenseForm: FormGroup;
  validation_messages = {
    concept: [
      { type:"required", message: "El concepto es requerido."}
    ],
    amount: [
      { type:"required", message: "El monto es requerido."}
    ]
  }

  constructor(private formBuilder: FormBuilder, 
              public alertController: AlertController,
              public eventorService: EventorService,
              private expensesService: ExpensesService,
              private alertService: AlertService,
              public authSvc: AuthService,
              public modalCtrl: ModalController) {

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
      createdAt: new FormControl(moment().format('ll')),
      updatedAt: new FormControl(moment().format('llll'))
    })
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    console.log("dismissModal");
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  async alertConfirm(expense: Expense){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Registrar <strong>nuevo gasto</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log("createGasto: ", expense);
            this.createExpense(expense);
          }
        }
      ]
    });
    await alert.present();
  }

  createExpense(expense: Expense){
  
    console.log('expense: ', expense);

    expense.createdBy = this.authSvc.getLoggedUser().uid;
    if(this.authSvc.getLoggedUser().createdBy) {
      //Lo esta creando un cobrador. Aunque no se soporta este permiso actualmente
      expense.adminId = this.authSvc.getLoggedUser().createdBy;
    } else {
      expense.adminId = this.authSvc.getLoggedUser().uid;
    }

    this.expensesService.createNewExpense(expense);

    this.dismissModal();
    
  }

}
