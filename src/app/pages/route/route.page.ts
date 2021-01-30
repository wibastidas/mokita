import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Customer } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {
  public customers: Customer[];
  public loading: Boolean= false;
  public sales: any[];
  public today = moment().format('llll');
  constructor(private router: Router,
              private actionSheetController: ActionSheetController,
              private authSvc: AuthService, 
              private customersService: CustomersService,
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

  goNewSale(){
    this.router.navigateByUrl('/new-sale');
  }

  async showOptions() {
    let buttonsActionSheet = [{
      text: 'Cerrar Sesión',
      icon: 'log-out-outline',
      handler: () => {
        console.log('Cerrar sesion clicked');
        this.authSvc.logout();
        this.router.navigate(['/login']);
      }
    }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancelar clicked');
      }
    }];

    if (this.roleAutorization.canCreateUser(this.authSvc.getLoggedUser())) {
      buttonsActionSheet.unshift({
        text: 'Crear Usuario',
        icon: 'person-add-outline',
        handler: () => {
          this.router.navigate(['/register']);
        }
      })
    }
    
    const actionSheet = await this.actionSheetController.create({
      header: this.authSvc.getLoggedUser().displayName || this.authSvc.getLoggedUser().email,
      cssClass: 'my-custom-class',
      buttons: buttonsActionSheet
    });
    await actionSheet.present();
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

        this.getSalesByCustomer();

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
        this.getSalesByCustomer();

        this.customers = this.customers.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })

        this.loading = false;
      });
    }
  }


  getSalesByCustomer(){
    console.log("getSalesByCustomer");

    if(this.customers && this.customers.length > 0){
      this.customers.forEach(customer => {
        this.customersService.getSalesByCustomerId(customer.id).subscribe(data => {
          customer.sale = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as any
            } 
          });          
          this.loading = false;
        });
      })
      console.log("customers: ", this.customers);

    }
  }

  // goCustomerDetail(customer){
  //   this.router.navigateByUrl('/customer-detail/' + customer.id);
  // }

  goSaleDetail(sale){
    this.router.navigateByUrl('/sale-detail/' + sale.id);
  }

}
