import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public today = moment().format('ll');
  public isAdmin;
  public totalRecaudado;
  public totalSaldo;
  public gastosDelDia;
  public totalRecaudar;
  public customers$: Observable<any>;
  public expenses$: Observable<any>

  constructor(public authSvc: AuthService, private customersService: CustomersService, private expensesService: ExpensesService,) { }

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

    } else {
      this.customers$ = this.customersService.getSalesAndCustomersByCobrador(this.authSvc.getLoggedUser().uid);
      this.subscription.add(this.customers$.subscribe(res => this.calcularRecaudoYsaldo(res)));

      this.expenses$ = this.expensesService.getExpensesByCobrador(this.authSvc.getLoggedUser().uid, this.today); 
      this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res))); 
    }
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

  calcularGastos(gastos){
    this.gastosDelDia = 0;
    this.gastosDelDia = gastos.reduce((prev, cur) => prev + cur.amount, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
