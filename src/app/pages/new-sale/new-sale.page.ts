import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/interfaces';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.page.html',
  styleUrls: ['./new-sale.page.scss'],
})
export class NewSalePage implements OnInit {
  saleForm: FormGroup;
  customers: Customer[];
  documentCustomerSelected: number;
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
              private customersService: CustomersService) {

    //this.customers = firestore.collection('customers').valueChanges();

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
    this.customersService.getCustomers().pipe(take(1)).subscribe((customers: Customer[]) => {
      console.log('customers: ', customers);
      this.customers = customers;
      //DD/MM/YYYY HH:mm:ss"
      const format1 = "MMMM Do YYYY, h:mm:ss a"
      const format2 = "YYYY-MM-DD"

      let dateTime1A = moment(customers[1].createdAt).format(format1);
      let dateTime2B = moment(customers[1].createdAt).format(format2);

      console.log("dateTime1A: ", dateTime1A);
      console.log("dateTime2B: ", dateTime2B);

      // console.log("moment(): ", moment(customers[0].date).format('MM/DD/YYYY'));
    });
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

        

            sale.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            sale.cuotas = this.createCuotas(sale.numeroCuotas);
            let montoInteres = (sale.amount * (sale.rate + sale.amount) / 100);
            sale.montoCuota =  montoInteres / sale.numeroCuotas;

            console.log("montoInteres: ",  montoInteres );
            console.log("B: ",  sale.numeroCuotas );
            
            console.log("sale.numeroCuotas: ", sale.numeroCuotas)
          }
        }
      ]
    });

    await alert.present();

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

  updateDocumentCustomerSelected(){
    console.log('Event Called:', this.documentCustomerSelected);
  }

} 

 