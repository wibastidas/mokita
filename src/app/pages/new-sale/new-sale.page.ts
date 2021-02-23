import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.page.html',
  styleUrls: ['./new-sale.page.scss'],
})
export class NewSalePage implements OnInit {
  public saleForm: FormGroup;
  public customers$: Observable<any>
  public customerId: string;
  public montoCuota;

  validation_messages = {
    amount: [
      { type:"required", message: "El monto es requerido."}
    ],
    // ,
    // modality: [
    //   { type:"required", message: "La modalidad es requerido."}
    // ],
    numeroCuotas: [
      { type:"required", message: "El número de cuotas es requerida."}
    ],
    porcentaje: [
      { type:"required", message: "El % de interés es requerido."}
    ]
  }
  constructor(private formBuilder: FormBuilder, 
              public alertController: AlertController,
              public alertService: AlertService,
              private customersService: CustomersService, 
              public authSvc: AuthService,
              public salesService: SalesService,
              private location: Location) {

    this.saleForm = this.formBuilder.group({
      amount: new FormControl("", Validators.compose([
        Validators.required
      ])),
      numeroCuotas: new FormControl(20, Validators.compose([
        Validators.required
      ])),
      porcentaje: new FormControl(20, Validators.compose([
        Validators.required
      ])),
      montoCuota: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ])),
      vencimiento: new FormControl(""),
      updatedAt: new FormControl(""),
    })
  }

  ngOnInit() {
    
    let isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    if (isAdmin) { 
      this.customers$ = this.customersService.getCustomersByAdmin(this.authSvc.getLoggedUser().uid);
    } else {
      this.customers$ = this.customersService.getCustomersByCobrador(this.authSvc.getLoggedUser().uid);
    }

    this.saleForm.valueChanges.subscribe(selectedValue => {
      if(this.saleForm.get('amount') && this.saleForm.get('numeroCuotas') && this.saleForm.get('porcentaje')){
        this.calcularMontoCuota();
      }
    })
  }

  async registerSale(sale){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Registrar <strong>Préstamo</strong>',
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
            this.createSale(sale);
          }
        }
      ]
    });

    await alert.present();

  }

  async createSale(sale){
  
    sale.createdAt = moment(new Date()).format("MM/DD/YYYY");
    sale.updatedAt = moment(new Date()).format("MM/DD/YYYY");
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    sale.customerId = this.customerId
    sale.intereses = sale.amount * sale.porcentaje/100;
    sale.montoConInteres = sale.amount + sale.intereses;
    sale.montoCuota = sale.montoConInteres/sale.numeroCuotas;
    sale.estado = 'Activo';
    sale.vencimiento = this.calcularFechaVencimiento(sale.numeroCuotas);
    sale.abonos = [];
    sale.cuotasPendientes = sale.numeroCuotas; 
    sale.cuotasPagadas = 0
    sale.saldo = sale.montoConInteres;
    sale.createdBy = this.authSvc.getLoggedUser().uid;
    if(this.authSvc.getLoggedUser().createdBy) {
      //Lo esta creando un cobrador. Aunque no se soporta este permiso actualmente
      sale.adminId = this.authSvc.getLoggedUser().createdBy;
    } else {
      sale.adminId = this.authSvc.getLoggedUser().uid;
    }
    await this.salesService.createNewSale(sale).then(res => { this.showConfirmation() });
  }

  showConfirmation(){
    this.alertService.presentAlert("Préstamo creado satisfactoriamente!", "Puede ver el prestamo en la información del cliente", ['Ok'])
    this.location.back();
  }

  createCuotas(numeroCuotas){
    let dates = [];
    let cont;
    let numeroCuotasTmp = numeroCuotas;

    for(cont=1; cont <= numeroCuotasTmp; cont++ ) {

      if(moment(moment().add(cont,'days').format('YYYY-MM-DD')).format('dddd') !== 'domingo'){
        dates.push({
          cuota: dates.length + 1,
          date: moment().add(cont,'days').format('MM/DD/YYYY'),
          fechaPago: null,
        });
      } else {
        numeroCuotasTmp = numeroCuotasTmp + 1;
      }
    }
    return dates;
  }

  calcularMontoCuota(){
    let intereses = this.saleForm.get('amount').value * this.saleForm.get('porcentaje').value/100;
    let montoConInteres = this.saleForm.get('amount').value + intereses;
    this.montoCuota = montoConInteres/this.saleForm.get('numeroCuotas').value;
  }

  calcularFechaVencimiento(numeroCuotas){
    let dates = [];

    let cont;
    let numeroCuotasTmp = numeroCuotas;

    for(cont=1; cont <= numeroCuotasTmp; cont++ ) {

      if(moment(moment().add(cont,'days').format('YYYY-MM-DD')).format('dddd') !== 'domingo'){
        dates.push({
          cuota: dates.length + 1,
          date: moment().add(cont,'days').format("MM/DD/YYYY"),
          fechaPago: null,
        });
      } else {
        numeroCuotasTmp = numeroCuotasTmp + 1;
      }
    }
    return dates[numeroCuotas - 1].date;
  }

} 

 