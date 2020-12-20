import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Customer } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
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
    rate: [
      { type:"required", message: "El % de interés es requerido."}
    ]
  }
  constructor(private formBuilder: FormBuilder, 
              public alertController: AlertController,
              public alertService: AlertService,
              private customersService: CustomersService, 
              public salesService: SalesService,
              private location: Location) {

    this.saleForm = this.formBuilder.group({
      amount: new FormControl("", Validators.compose([
        Validators.required
      ])),
      numeroCuotas: new FormControl(20, Validators.compose([
        Validators.required
      ])),
      rate: new FormControl(20, Validators.compose([
        Validators.required
      ])),
      fee: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ])),
    })
  }

  ngOnInit() {
    console.log("moment()", moment().format('llll'))
    
    this.customersService.getCustomersNew().subscribe(data => {
      this.customers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Customer
        } 
      });
      console.log("this.customers: ", this.customers)
    });

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
      if(this.saleForm.get('amount') && this.saleForm.get('numeroCuotas') && this.saleForm.get('rate')){
        this.calcularMontoCuota();
      }
    })
  }

  async registerSale(sale){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Registrar <strong>venta</strong>',
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
  
    sale.createdAt = moment().format('llll');
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    sale.customerId = this.customerId
    sale.interest = sale.amount * sale.rate/100;
    sale.amountWithRate = sale.amount + sale.interest;
    sale.fee = sale.amountWithRate/sale.numeroCuotas;
    sale.paidFees = 0;
    sale.pendingFees = sale.numeroCuotas; 
    sale.state = 'Active';
    console.log('sale: ', sale);
    //sale.vencimiento = sale.cuotas[sale.numeroCuotas - 1].date;

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
          date: moment().add(cont,'days').format('llll'),
          fechaPago: null,
        });
      } else {
        numeroCuotasTmp = numeroCuotasTmp + 1;
      }
    }
    return dates;
  }

  calcularMontoCuota(){
    let interest = this.saleForm.get('amount').value * this.saleForm.get('rate').value/100;
    let amountWithRate = this.saleForm.get('amount').value + interest;
    this.montoCuota = amountWithRate/this.saleForm.get('numeroCuotas').value;
  }

  // addDays(days : number): Date{
  //   var futureDate = Date.now();
  //   futureDate.setDate(futureDate.getDate() + days);
  //   return futureDate;
  // }

} 

 