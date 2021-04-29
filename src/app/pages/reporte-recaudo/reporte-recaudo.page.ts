import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-reporte-recaudo',
  templateUrl: './reporte-recaudo.page.html',
  styleUrls: ['./reporte-recaudo.page.scss'],
})
export class ReporteRecaudoPage implements OnInit {
  public from: any;
  public to: any;
  public dayToday = moment(new Date()).format("MM/DD/YYYY")
  public isAdmin;
  public prestamos$: Observable<any>;
  private subscription = new Subscription();
  public abonos = [];
  public montoTotalRecaudado;

  constructor(private modalCtrl: ModalController, 
               public alertController: AlertController,
               public authSvc: AuthService, 
               public datePipe: DatePipe,
               private alertService: AlertService,
               private customersService: CustomersService) { }

  ngOnInit() {
    this.from = this.dayToday;
    this.to = this.dayToday;
    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    this.getPrestamos();
  }

  ngOnDestroy() {
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
      this.abonos = [];
      this.getPrestamos();
    }
  }

  getPrestamos(){
    this.montoTotalRecaudado = 0;
    if (this.isAdmin) {
      this.prestamos$ = this.customersService.getAbonosByAdminAndDates(this.authSvc.getLoggedUser().uid, this.datePipe.transform(this.from, 'MM/dd/yyyy'),this.datePipe.transform(this.to, 'MM/dd/yyyy'));
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamos(res)));
    } else {
      this.prestamos$  = this.customersService.getAbonosByCobradorAndDates(this.authSvc.getLoggedUser().uid, this.datePipe.transform(this.from, 'MM/dd/yyyy'),this.datePipe.transform(this.to, 'MM/dd/yyyy'));
      this.subscription.add(this.prestamos$.subscribe(res => this.calcularPrestamos(res)));
    }

  }

  calcularPrestamos(data){
    let abonos = [];
    data.forEach(cliente => {

      if(cliente.sale.abonos && cliente.sale.abonos.length > 0){
        cliente.sale.abonos.forEach(abono => {

          if(moment(abono.createdAt).isSameOrAfter(this.datePipe.transform(this.from, 'MM/dd/yyyy'), 'day') &&  moment(abono.createdAt).isSameOrBefore(this.datePipe.transform(this.to, 'MM/dd/yyyy'), 'day')){ 

            let newAbono = {
              ...abono,
              name: cliente.name,
              lastName: cliente.lastName
            }
            abonos.push(newAbono);
            // abonos.sort(function(a, b) {
            //   return Math.abs(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());  
            // })
          }
        });
      }
    });

    // console.log("abonos**: ", abonos)
    let abonosGrouped = this.groupBy(abonos, abono => abono.createdAt);
    // console.log("grouped", grouped); 
    // for (var key in grouped.) {
    //   var value = grouped[key];
    //   console.log(key, value);
    // }

    abonosGrouped = new Map([...abonosGrouped.entries()].sort().reverse());

    abonosGrouped.forEach((value, key) => {
      console.log("value", value);
      console.log("key", key);
      if(value && value.length > 0){
        //let bonoTotalDia = this.calcularAbonos(value);
        this.montoTotalRecaudado = this.montoTotalRecaudado + this.calcularAbonos(value);
        console.log("this.calcularAbonos(value)", this.calcularAbonos(value));

      }
      this.abonos.push(value)
    });

 
    console.log("this.abonos: ", this.abonos)

    

  }

  calcularAbonos(abonos){
    console.log("calcularAbonos: ", abonos);
    return abonos.reduce((total, abono) => total + abono.monto, 0);
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

}
