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
  public today = moment().format('ll');
  public totalRecaudado = 0;
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
    console.log("today: ", this.today);

    if(this.customers && this.customers.length > 0){
      let cont = 0;
       this.customers.forEach(customer => {
        this.customersService.getSalesByCustomerId(customer.id).subscribe(data => {
          let sale = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as any
            } 
          });   

          // if(sale && sale[0] && sale[0].abonos && sale[0].abonos[0]) {
          //   console.log("createdAt: ", sale[0].abonos[sale[0].abonos.length - 1].createdAt);
          // }
          customer.sale = sale;   
          cont++;

          if(cont == this.customers.length){
            this.calcularRecaudo(this.customers);
          }
        });
      })

      this.loading = false;


    }
  }

  goSaleDetail(sale){
    this.router.navigateByUrl('/sale-detail/' + sale.id);
  }

  calcularRecaudo(customers){
    console.log("calcularRecaudo: ",customers);
    this.customers.forEach(customer => {

      if(customer.sale && customer.sale[0] && customer.sale[0].abonos && customer.sale[0].abonos[0] && customer.sale[0].abonos[customer.sale[0].abonos.length - 1] 
        && (customer.sale[0].abonos[customer.sale[0].abonos.length - 1].createdAt == this.today)){
          console.log(customer.sale[0].abonos[customer.sale[0].abonos.length - 1].monto);
          this.totalRecaudado+=  customer.sale[0].abonos[customer.sale[0].abonos.length - 1].monto;
      }

    });
  }

}
