import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

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
              public firestore: AngularFirestore) {

    this.customers = firestore.collection('customers').valueChanges();

    this.saleForm = this.formBuilder.group({
      amount: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit() {
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
