import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Customer } from 'src/app/interfaces/interfaces';
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
  public customers: Customer[];

  public loading: Boolean= false;
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
    this.loading = true;

    let isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (isAdmin) {
      this.customersService.getCustomersByAdmin(this.authSvc.getLoggedUser().uid).subscribe(data => {
        this.customers = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Customer
          } 
        });
        this.customers = this.customers.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
        this.loading = false;
      });
    } else {
      this.customersService.getCustomersByCobrador(this.authSvc.getLoggedUser().uid).subscribe(data => {
        this.customers = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Customer
          } 
        });
        this.customers = this.customers.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
        this.loading = false;
      });
    }
  }

  goCustomerDetail(customer){
    this.router.navigateByUrl('/customer-detail/' + customer.id);
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




}
