import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
import { ExpenseDetailPage } from '../expense-detail/expense-detail.page';
import { NewExpensePage } from '../new-expense/new-expense.page';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  public loading: Boolean= false;
  public today = moment().format('ll');
  public expenses$: Observable<any>

  constructor(private expensesService: ExpensesService,
              public alertController: AlertController,
              public authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService,
              private modalController: ModalController) { }

  ngOnInit() {
    if (this.authSvc.getLoggedUser()) {
      this.getExpenses();  
    } else {
      this.authSvc.getLoggedUser$().subscribe(value => {
        this.getExpenses();  
      });
    } 
  }

  getExpenses(){
    let isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (isAdmin) {
      this.expenses$ = this.expensesService.getExpensesByAdmin(this.authSvc.getLoggedUser().uid, this.today);
    } else {
      this.expenses$ = this.expensesService.getExpensesByCobrador(this.authSvc.getLoggedUser().uid, this.today);     
    }
  }

  async goExpenseDetail(expense) {

    const modal = await this.modalController.create({
      component: ExpenseDetailPage,
      componentProps: {
        expense: expense
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      if (data['data'].dismissed)  this.getExpenses();
    });

    return await modal.present();
  }

  async createExpense() {

    const modal = await this.modalController.create({
      component: NewExpensePage,
    });
    return await modal.present();
  }

  async deleteExpense(expense) {
    console.log("expense: ", expense);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Gasto!',
      message: 'El gasto será eliminado ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.expensesService.deleteExpense(expense.id).then(m => this.getExpenses());
          }
        }
      ]
    });

    await alert.present();
    
  }

}
