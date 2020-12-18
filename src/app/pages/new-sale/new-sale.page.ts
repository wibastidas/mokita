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
    })
  }

  ngOnInit() {
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
  
    sale.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    sale.customerId = this.customerId
    sale.interest = sale.amount * sale.rate/100;
    sale.amountWithRate = sale.amount + sale.interest;
    sale.fee = sale.amountWithRate/sale.numeroCuotas;
    sale.paidFees = 0;
    sale.pendingFees = sale.cuotas; 
    sale.state = 'Active';
    console.log('sale: ', sale);
  
    await this.salesService.createNewSale(sale).then(res => { this.showConfirmation() });
    
  }

  showConfirmation(){
    //this.saleForm.reset();
    //this.customerId = null;
    this.alertService.presentAlert("Cliente creado satisfactoriamente!", "Puede ver el prestamo en la información del cliente", ['Ok'])
    this.location.back();
  }

  createCuotas(numeroCuotas){
    let dates = [];

    let cont;
    let numeroCuotasTmp = numeroCuotas;

    for(cont=1; cont <= numeroCuotasTmp; cont++ ) {

      if(moment(moment().add(cont,'days').format('YYYY-MM-DD')).format('dddd') !== 'Sunday'){
        dates.push({
          cuota: dates.length + 1,
          date: moment().add(cont,'days').format('YYYY-MM-DD'),
          fechaPago: null,
        });
      } else {
        numeroCuotasTmp = numeroCuotasTmp + 1;
      }
    }
    return dates;
  }

} 

 