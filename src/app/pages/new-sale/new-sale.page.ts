import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
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
  customers: Observable<any[]>;
  validation_messages = {
    amount: [
      { type:"required", message: "El monto es requerido."}
    ]
    // ,
    // modality: [
    //   { type:"required", message: "La modalidad es requerido."}
    // ],
    // numeroCuotas: [
    //   { type:"required", message: "El numero de cuotas es requerida."}
    // ]
  }
  constructor(private formBuilder: FormBuilder, 
              public alertController: AlertController,
              private customersService: CustomersService) {

    //this.customers = firestore.collection('customers').valueChanges();

    this.saleForm = this.formBuilder.group({
      amount: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit() {
    this.customersService.getCustomers().pipe(take(1)).subscribe((clientes: Customer[]) => {
      console.log('clientes: ', clientes[0].date);

      //DD/MM/YYYY HH:mm:ss"
      const format1 = "MMMM Do YYYY, h:mm:ss a"
      const format2 = "YYYY-MM-DD"

      let dateTime1 = moment(clientes[0].date).format(format1);
      let dateTime2 = moment(clientes[0].date).format(format2);

      console.log("dateTime1: ", dateTime1);
      console.log("dateTime2: ", dateTime2);

      // console.log("moment(): ", moment(clientes[0].date).format('MM/DD/YYYY'));
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
            console.log("registerSale: ", sale);
          }
        }
      ]
    });

    await alert.present();

  }

}

 