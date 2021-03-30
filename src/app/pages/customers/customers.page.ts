import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
import { NewCustomerPage } from '../new-customer/new-customer.page';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  public customers$: Observable<any>
  public user;

  constructor(private customersService: CustomersService,
              public alertController: AlertController,
              private router: Router,
              public authSvc: AuthService, 
              private modalController: ModalController,
              public roleAutorization: RoleBasedAutorizationService) { }

  ngOnInit() {
    if (this.authSvc.getLoggedUser()) {
      this.getCustomers(); 
    } else {
      this.authSvc.getLoggedUser$().subscribe(value => {
        this.getCustomers(); 
      });
    }
  }

  getCustomers(){
    let isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (isAdmin) { 
      this.customers$ = this.customersService.getCustomersByAdmin(this.authSvc.getLoggedUser().uid);
    } else {
      this.customers$ = this.customersService.getCustomersByCobrador(this.authSvc.getLoggedUser().uid);
    }
  }

  goCustomerDetail(customer){
    this.router.navigateByUrl('/home/customers/customer-detail/' + customer.id);
  }

  async createCustomer() {

    const modal = await this.modalController.create({
      component: NewCustomerPage,
    });
    return await modal.present();
  }


  async deleteCustomer(customer) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Cliente!',
      message: 'El cliente será eliminado ',
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
            this.customersService.deleteCustomer(customer.id).then(m => this.getCustomers());
          }
        }
      ]
    });

    await alert.present();
    
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }




}
