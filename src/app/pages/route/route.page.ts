import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit, OnDestroy {
  public loading;
  public sales: any[];
  public today = moment().format('ll');
  public dayToday = moment().format('llll');
  public totalRecaudado;
  public totalSaldo;
  public customers$: Observable<any>
  public isAdmin;
  private subscription = new Subscription();
  public totalRecaudar;

  category:any = "day";
  gaugeLabel = "de $1000";
  gaugePrependText = "$"
  gaugeType = "arch";
  gaugeValue = 10.5;
  
  constructor(private router: Router,
              private actionSheetController: ActionSheetController,
              public authSvc: AuthService, 
              private customersService: CustomersService,
              public roleAutorization: RoleBasedAutorizationService) {
              }

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
    this.totalRecaudado = 0;
    this.totalSaldo = 0;
    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (this.isAdmin) {
      this.customers$ = this.customersService.getSalesAndCustomersByAdmin(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));
    } else {
      this.customers$ = this.customersService.getSalesAndCustomersByCobrador(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));
    }
  }


  goSaleDetail(sale){
    this.router.navigateByUrl('/sale-detail/' + sale.id);
  }

  calcularRecaudoYsaldo(customers){
    this.totalRecaudado = 0;
    this.totalSaldo = 0;
    this.totalRecaudar = 0;

    customers.forEach(customer => {
      if(customer.sale && customer.sale.abonos && customer.sale.abonos.length > 0) {
        customer.sale.abonos.forEach(abono => {
          if(abono.createdAt == this.today && abono.monto > 0) {
            this.totalRecaudado+=  abono.monto;
          }
        })
      }

      if(customer.sale && customer.sale.saldo) {
        this.totalSaldo+= customer.sale.saldo;

        if(customer.sale.montoCuota <= customer.sale.saldo) {
          this.totalRecaudar+= customer.sale.montoCuota;
        } else {
          this.totalRecaudar+= customer.sale.saldo;
        }
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
