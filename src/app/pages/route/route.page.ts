import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit, OnDestroy {
  public loading;
  public sales: any[];
  public today = moment(new Date()).format("MM/DD/YYYY");
  public dayName = moment().format('dddd') ;
  public dayToday = moment(new Date()).format("MM/DD/YYYY")
  public totalRecaudado;
  public totalSaldo;
  public customers$: Observable<any>
  public isAdmin;
  private subscription = new Subscription();
  public totalRecaudar;
  cobradores: any;
  cobradorSeleccionado = "todos";

  category:any = "day";
  gaugePrependText = "$"
  gaugeType = "arch";
  
  constructor(private router: Router,
              private actionSheetController: ActionSheetController,
              public authSvc: AuthService, 
              public salesService: SalesService,
              public alertController: AlertController,
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
    this.router.navigateByUrl('/home/new-sale');
  }

  async showOptions() {
    let buttonsActionSheet = [{
      text: 'Cerrar Sesión',
      icon: 'log-out-outline',
      handler: () => {
        this.authSvc.logout();
        this.router.navigate(['/home']);
      }
    }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        //console.log('Cancelar clicked');
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
      buttons: buttonsActionSheet,
      mode: "ios"
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
      this.customersService.getVendedoresByAdmin(this.authSvc.getLoggedUser().uid).subscribe((data) => {
 
        this.cobradores = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as User
          } 
        });
      });
    } else {
      this.customers$ = this.customersService.getSalesAndCustomersByCobrador(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));
    }
  }


  goSaleDetail(customer){
    console.log("customer: ", customer)

    this.router.navigateByUrl('home/route/sale-detail/' + customer.sale.id + '/' + customer.name + '/' + customer.lastName + '/' + customer.phoneNumber);
  }

  calcularRecaudoYsaldo(customers){
    console.log("calcularRecaudoYsaldo");
    this.totalRecaudado = 0;
    this.totalSaldo = 0;
    this.totalRecaudar = 0;

    customers.forEach(customer => {

      // if(customer.sale){
      //   customer.sale.vencido = moment(customer.sale.vencimiento, "MM/DD/YYYY").isBefore(this.dayToday);
      // }


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

  async agregarAbono(sale, montoCuota) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Realizar Abono!',
      mode: "ios",
      inputs: [
        {
          name: 'monto',
          type: 'number',
          placeholder: 'Monto',
          value: montoCuota
        },
        {
          name: 'note',
          type: 'textarea',
          placeholder: 'Notas'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            let monto = 0;
            if(data.monto){
              monto = data.monto;
            }
            sale.abonos.push({monto, note: data.note, createdAt: moment(new Date()).format("MM/DD/YYYY"), createdBy: this.authSvc.getLoggedUser().uid});
            this.updateSale(sale);
            
          }
        }
      ]
    });
    await alert.present();
  }

  async updateSale(sale){
    sale.updatedAt = moment(new Date()).format("MM/DD/YYYY");
    sale.saldo = this.calcularSaldoPendiente(sale);
    sale.cuotasPendientes = sale.saldo/sale.montoCuota
    sale.cuotasPagadas = sale.numeroCuotas - sale.cuotasPendientes;
    if(sale.cuotasPendientes <= 0){
      sale.estado = "Pagado"
      sale.fechaUltimoPago = moment(new Date()).format("MM/DD/YYYY");
    } else {
      sale.estado = "Activo"
      sale.fechaUltimoPago = "";
    }
    await this.salesService.updateSale(sale);
  }


  calcularSaldoPendiente(sale){

    let saldo = sale.montoConInteres;
    if(sale && sale.abonos && sale.abonos.length > 0) {
      saldo = sale.montoConInteres - this.calcularAbonos(sale.abonos);
    }
    return saldo;
  }

  calcularAbonos(abonos){
    return abonos.reduce((total, abono) => total + abono.monto, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  cobradorChange(ev){
    if(this.cobradorSeleccionado === 'todos'){
      this.customers$ = this.customersService.getSalesAndCustomersByAdmin(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));
    } else {
      this.customers$ = this.customersService.getSalesAndCustomersByCobrador(this.cobradorSeleccionado);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));
    }

  }

}
