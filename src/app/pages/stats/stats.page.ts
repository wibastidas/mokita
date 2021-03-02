import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ReporteGastosPage } from '../reporte-gastos/reporte-gastos.page';
import { ReportePrestamosSaldoPendientePage } from '../reporte-prestamos-saldo-pendiente/reporte-prestamos-saldo-pendiente.page';
import { ReportePrestamosPage } from '../reporte-prestamos/reporte-prestamos.page';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public today = moment(new Date()).format("MM/DD/YYYY");
  public isAdmin;
  public totalRecaudado;
  public totalClientesActivos;
  public totalSaldo;
  public gastosDelDia;
  public totalRecaudar;
  public customers$: Observable<any>;
  public expenses$: Observable<any>
  public expensesMonth$: Observable<any>
  public prestamosNuevos$: Observable<any>
  public prestamosPagados$: Observable<any>
  public prestamosConSaldoPendiente = [];
  public cantidadPrestamosNuevos = 0;
  public cantidadPrestamosCobrados = 0;
  public montoPrestamosNuevos = 0;
  public montoPrestamosPagados = 0;
  public cantidadTotalGastos = 0;
  public montoTotalGastos = 0;
  public gastos= [];
  public dayName = moment().format('dddd') ;
  public monthName = moment().format('MMMM') ;
  public yearName = moment().format('YYYY') ;
  public dayToday = moment(new Date()).format("MM/DD/YYYY")
  public firstDayCurrentMonth = moment().date(1).format("MM/DD/YYYY")

  gaugeType = "full";
  gaugeAppendText = "$";

  constructor(public authSvc: AuthService, 
              private customersService: CustomersService, 
              private modalController: ModalController,
              public popoverController: PopoverController,
              private expensesService: ExpensesService,) { }

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
    this.totalRecaudado = 0;
    this.totalSaldo = 0;
    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (this.isAdmin) {
      this.customers$ = this.customersService.getSalesAndCustomersByAdmin(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));

      this.expenses$ = this.expensesService.getExpensesByAdmin(this.authSvc.getLoggedUser().uid, this.today);
      this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res)));

      this.prestamosPagados$ = this.customersService.getPrestamosPagadosByAdminAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth, this.dayToday);
      this.subscription.add(this.prestamosPagados$.subscribe(res => this.calcularPrestamosPagados(res)));

      this.prestamosNuevos$ = this.customersService.getPrestamosNuevosByAdminAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth, this.dayToday);
      this.subscription.add(this.prestamosNuevos$.subscribe(res => this.calcularPrestamosNuevos(res)));

      this.expensesMonth$ = this.expensesService.getExpensesByAdminAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth, this.dayToday);
      this.subscription.add(this.expensesMonth$.subscribe(res => this.calcularGastosDelMes(res)));

    } else {
      this.customers$ = this.customersService.getSalesAndCustomersByCobrador(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));

      this.expenses$ = this.expensesService.getExpensesByCobrador(this.authSvc.getLoggedUser().uid, this.today); 
      this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res))); 

      this.prestamosPagados$  = this.customersService.getPrestamosPagadosByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth, this.dayToday);
      this.subscription.add(this.prestamosPagados$.subscribe(res => this.calcularPrestamosPagados(res)));

      this.prestamosNuevos$ = this.customersService.getPrestamosNuevosByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth,this.dayToday);
      this.subscription.add(this.prestamosNuevos$.subscribe(res => this.calcularPrestamosNuevos(res)));


      this.expensesMonth$ = this.expensesService.getExpensesByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.firstDayCurrentMonth, this.dayToday);
      this.subscription.add(this.expensesMonth$.subscribe(res => this.calcularGastosDelMes(res)));
    }
  }

  calcularRecaudoYsaldo(customers){
    this.totalRecaudado = 0;
    this.totalSaldo = 0;
    this.totalRecaudar = 0;
    this.totalClientesActivos = 0;
    this.prestamosConSaldoPendiente = [];

    customers.forEach(customer => {

      if(customer.sale && customer.sale.abonos && customer.sale.abonos.length > 0) {
        customer.sale.abonos.forEach(abono => {
          if(abono.createdAt == this.today && abono.monto > 0) {
            this.totalRecaudado+=  abono.monto;
          }
        })

        if(customer.sale.estado === 'Activo'){
          this.totalClientesActivos+=  1;
        }
      }

      if(customer.sale && customer.sale.saldo) {
        this.prestamosConSaldoPendiente.push(customer);
        this.totalSaldo+= customer.sale.saldo;


        if(customer.sale.montoCuota <= customer.sale.saldo) {
          this.totalRecaudar+= customer.sale.montoCuota;
        } else {
          this.totalRecaudar+= customer.sale.saldo;
        }
      }

    });
  }

  calcularGastos(gastos){
    console.log("gastos: ", gastos)
    this.gastosDelDia = 0;
    this.gastosDelDia = gastos.reduce((prev, cur) => prev + cur.amount, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async presentPopover(ev: any) {
    // const popover = await this.popoverController.create({
    //   component: PopoverComponent,
    //   cssClass: 'my-custom-class',
    //   event: ev,
    //   translucent: true
    // });
    // return await popover.present();
  }

  calcularPrestamosNuevos(data){
    this.cantidadPrestamosNuevos = 0;
    this.montoPrestamosNuevos = 0;
    //console.log("data: ", data)
    this.cantidadPrestamosNuevos = data.length;
    this.montoPrestamosNuevos = data.reduce((prev, cur) => prev + cur.sale.amount, 0);

  }

  calcularPrestamosPagados(data){
    this.cantidadPrestamosNuevos = 0;
    this.montoPrestamosNuevos = 0;
    //console.log("data: ", data)
    this.calcularPrestamosPagados = data.length;
    this.montoPrestamosPagados = data.reduce((prev, cur) => prev + cur.sale.amount, 0);

  }

  calcularGastosDelMes(data){
    this.gastos = data;
    this.cantidadTotalGastos = 0;
    this.montoTotalGastos = 0;
    this.cantidadTotalGastos =  data.length;
    this.montoTotalGastos = data.reduce((prev, cur) => prev + cur.amount, 0);;
  }
  
  doRefresh(event) {

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async goReportePrestamosNuevos() {

    const modal = await this.modalController.create({
      component: ReportePrestamosPage,
      componentProps: {
        title: 'Préstamos Nuevos',
        prestamos: this.prestamosNuevos$,
        from: "03/01/2021",
        to: "03/01/2021",
        montoTotal: this.montoPrestamosNuevos
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      //if (data['data'].dismissed)  this.getExpenses();
    });

    return await modal.present();
  }

  async goReportePrestamosPagados() {

    const modal = await this.modalController.create({
      component: ReportePrestamosPage,
      componentProps: {
        title: 'Préstamos Finalizados',
        prestamos: this.prestamosPagados$,
        from: "03/01/2021",
        to: "03/01/2021",
        montoTotal: this.montoPrestamosPagados
      }
    });

      

    modal.onDidDismiss()
    .then((data) => {
      //if (data['data'].dismissed)  this.getExpenses();
    });

    return await modal.present();
  }

  async goReportePrestamosSaldoPendiente() {

    const modal = await this.modalController.create({
      component: ReportePrestamosSaldoPendientePage,
      componentProps: {
        prestamos: this.prestamosConSaldoPendiente,
        from: "03/01/2021",
        to: "03/01/2021",
        montoTotal: this.totalSaldo
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      //if (data['data'].dismissed)  this.getExpenses();
    });

    return await modal.present();
  }
  
  async goReporteGastos() {

    const modal = await this.modalController.create({
      component: ReporteGastosPage,
      componentProps: {
        gastos: this.gastos,
        from: "03/01/2021",
        to: "03/01/2021",
        montoTotal: this.montoTotalGastos

      }
    });
    
    modal.onDidDismiss()
    .then((data) => {
      //if (data['data'].dismissed)  this.getExpenses();
    });

    return await modal.present();
  }


}
