import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-reporte-gastos',
  templateUrl: './reporte-gastos.page.html',
  styleUrls: ['./reporte-gastos.page.scss'],
})
export class ReporteGastosPage implements OnInit {
  public gastos: [];
  public from: string;
  public to: string;
  public montoTotal;
  public isAdmin;
  public expenses$: Observable<any>;
  private subscription = new Subscription();

  constructor(public navParams: NavParams, 
    public authSvc: AuthService, 
    private alertService: AlertService,
    public datePipe: DatePipe,
    private expensesService: ExpensesService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');

    this.gastos = this.navParams.get('gastos');
    this.from = this.navParams.get('from');
    this.to = this.navParams.get('to');
    this.montoTotal = this.navParams.get('montoTotal');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal(updated) {

    this.modalCtrl.dismiss({
      'dismissed': updated
    });
  }

  buscar(){
    if(moment(this.to).diff(moment(this.from), 'days') > 31 || moment(this.to).diff(moment(this.from), 'days') < 0) {
      this.alertService.presentAlert("Error!", "El rango de fechas de búsqueda no puede ser mayor a 31 días.", ['Ok'])
    } else {
      if (this.isAdmin) {
        this.expenses$ = this.expensesService.getExpensesByAdminAndDates(this.authSvc.getLoggedUser().uid, this.datePipe.transform(this.from, 'MM/dd/yyyy'),this.datePipe.transform(this.to, 'MM/dd/yyyy'));
        this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res)));
      } else {
        this.expenses$ = this.expensesService.getExpensesByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.datePipe.transform(this.from, 'MM/dd/yyyy'),this.datePipe.transform(this.to, 'MM/dd/yyyy')); 
        this.subscription.add(this.expenses$.subscribe(res => this.calcularGastos(res)));    
      }
  
    }
  }


  calcularGastos(gastos){
    this.gastos = gastos;
    this.montoTotal = gastos.reduce((prev, cur) => prev + cur.amount, 0);
  }

}
