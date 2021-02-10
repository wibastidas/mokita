import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Customer } from 'src/app/interfaces/interfaces';
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
  saleForm: FormGroup;
  customers: Customer[];
  customerId: string;
  montoCuota;
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
        
      });
    } else {
      this.customersService.getCustomersByCobrador(this.authSvc.getLoggedUser().uid).subscribe(data => {
        this.customers = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Customer
          } 
        });
      });
    }

    // this.customersService.getCustomers().pipe(take(1)).subscribe((customers: Customer[]) => {
    //   console.log('customers: ', customers);
    //   this.customers = customers;
    //   //DD/MM/YYYY HH:mm:ss"
    //   const format1 = "MMMM Do YYYY, h:mm:ss a"
    //   const format2 = "YYYY-MM-DD"

    //   let dateTime1A = moment(customers[1].createdAt).format(format1);
    //   let dateTime2B = moment(customers[1].createdAt).format(format2);

    //   console.log("dateTime1A: ", dateTime1A);
    //   console.log("dateTime2B: ", dateTime2B);

    //   // console.log("moment(): ", moment(customers[0].date).format('MM/DD/YYYY'));
    // });

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
  
    sale.createdAt = moment().format('ll');
    sale.updatedAt = moment().format('llll');
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    sale.customerId = this.customerId
    sale.intereses = sale.amount * sale.porcentaje/100;
    sale.montoConInteres = sale.amount + sale.intereses;
    sale.montoCuota = sale.montoConInteres/sale.numeroCuotas;
    sale.estado = 'Activo';
    sale.vencimiento = sale.cuotas[sale.numeroCuotas - 1].date;
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
    //this.saleForm.reset();
    //this.customerId = null;
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
          date: moment().add(cont,'days').format('ll'),
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

  // addDays(days : number): Date{
  //   var futureDate = Date.now();
  //   futureDate.setDate(futureDate.getDate() + days);
  //   return futureDate;
  // }

} 

 