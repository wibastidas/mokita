import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Expense } from 'src/app/interfaces/interfaces';
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
  expenses: Expense[];
  loading: Boolean= false;

  constructor(private expensesService: ExpensesService,
              public alertController: AlertController,
              private authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.getExpenses();   
  }

  getExpenses(){
    this.loading = true;
    this.expensesService.getExpensesNew().subscribe(data => {
      this.expenses = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Expense
        } 
      });
      console.log("this.expenses: ", this.expenses)
      this.loading = false;
    });
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
