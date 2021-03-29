import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
import { NewCustomerPage } from '../../new-customer/new-customer.page';
import { NewExpensePage } from '../../new-expense/new-expense.page';

@Component({
  selector: 'app-addtransactions',
  templateUrl: './addtransactions.page.html',
  styleUrls: ['./addtransactions.page.scss'],
})
export class AddtransactionsPage implements OnInit {
  requestType:string;
  constructor(private modalCtrl: ModalController,
              public navCtrl:NavController, 
              public authSvc: AuthService,
              private router: Router,
              public roleAutorization: RoleBasedAutorizationService
    ) { }
 
  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async goAddCustomer() {
    this.dismiss();

    const modal = await this.modalCtrl.create({
      component: NewCustomerPage,
    });
    return await modal.present();

  }

  async goAddExpense() {
    this.dismiss();

    const modal = await this.modalCtrl.create({
      component: NewExpensePage,
    });
    return await modal.present();
  }

  goNewSale(){
    this.dismiss();

    this.router.navigateByUrl('/home/new-sale');
  }


}
