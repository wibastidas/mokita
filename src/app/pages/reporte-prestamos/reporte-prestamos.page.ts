import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-reporte-prestamos',
  templateUrl: './reporte-prestamos.page.html',
  styleUrls: ['./reporte-prestamos.page.scss'],
})
export class ReportePrestamosPage implements OnInit, OnDestroy {
  public prestamos$: Observable<any>;
  public title: string;
  public from: string;
  public to: string;
  public montoTotal;
  private subscription = new Subscription();
  public cantidad = 0;
  public isAdmin;

  constructor( public navParams: NavParams, 
               public alertController: AlertController,
               public authSvc: AuthService, 
               private customersService: CustomersService, 
               private modalCtrl: ModalController) { 
  }

  ngOnInit() {

    this.prestamos$ = this.navParams.get('prestamos');
    this.title = this.navParams.get('title');
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
    console.log("buscar")
    if(moment(this.to).diff(moment(this.from), 'days') > 31 || moment(this.to).diff(moment(this.from), 'days') < 0) {
      console.log("El rango de fechas de búsqueda no puede ser mayor a 31 días");
      console.log("1")

    } else {
      console.log("2")

      if(this.title === 'Préstamos Nuevos'){

        this.getPrestamosNuevos();
      } else {
        this.getPrestamosFinalizados();
      }
    }
  }

  getPrestamosNuevos(){
    console.log("ger vPréstamos Nuevos")

    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (this.isAdmin) {
      console.log("ger isAdmin Nuevos")

      this.prestamos$ = this.customersService.getPrestamosNuevosByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.from,this.to);
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamosNuevos(res)));
    } else {
      this.prestamos$ = this.customersService.getPrestamosNuevosByCobradorAndDates(this.authSvc.getLoggedUser().uid,  this.from,this.to);
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamosNuevos(res)));
    }

  }

  getPrestamosFinalizados(){

    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (this.isAdmin) {
      this.prestamos$ = this.customersService.getPrestamosPagadosByAdminAndDates(this.authSvc.getLoggedUser().uid, this.from,this.to);
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamosNuevos(res)));
    } else {
      this.prestamos$  = this.customersService.getPrestamosPagadosByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.from,this.to);
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamosNuevos(res)));

    }

  }

  calcularPrestamosNuevos(data){
    console.log("calcularPrestamosNuevos: ", data)
    this.cantidad = 0;
    this.montoTotal = 0;
    //console.log("data: ", data)
    this.cantidad = data.length;
    this.montoTotal = data.reduce((prev, cur) => prev + cur.sale.amount, 0);
  }
 

 
}
