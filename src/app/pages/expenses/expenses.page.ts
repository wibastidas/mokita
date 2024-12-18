import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
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
  public today = moment(new Date()).format("MM/DD/YYYY");
  public expenses$: Observable<any>
  private subscription = new Subscription();
  public gastosDelDia;

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
      this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res)));
    } else {
      this.expenses$ = this.expensesService.getExpensesByCobrador(this.authSvc.getLoggedUser().uid, this.today); 
      this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res)));    
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
      //if (data['data'].dismissed)  this.getExpenses();
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

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'Eliminar Gasto!',
      message: 'El gasto será eliminado ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelar');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.expensesService.deleteExpense(expense.id);
          }
        }
      ]
    });

    await alert.present();
    
  }

  calcularGastos(gastos){
    this.gastosDelDia = 0;
    this.gastosDelDia = gastos.reduce((prev, cur) => prev + cur.amount, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
