import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Sale } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.page.html',
  styleUrls: ['./edit-sale.page.scss'],
})
export class EditSalePage implements OnInit, OnDestroy {
  saleForm: FormGroup;
  montoCuota;
  @Input() sale: Sale;

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
              public modalCtrl: ModalController,
              public salesService: SalesService) {

    this.saleForm = this.formBuilder.group({
      amount: new FormControl("", Validators.compose([
        Validators.required
      ])),
      numeroCuotas: new FormControl("", Validators.compose([
        Validators.required
      ])),
      rate: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cuotas: new FormControl([], Validators.compose([
        Validators.required
      ])),
      amountWithRate: new FormControl("", Validators.compose([
        Validators.required
      ])),
      montoCuota: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ])),
      state: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ])),
      createdAt: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ])),
      customerId: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cuotasPagadas: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cuotasPendientes: new FormControl("", Validators.compose([
        Validators.required
      ])),
      interest: new FormControl("", Validators.compose([
        Validators.required
      ])),
      // vencimiento: new FormControl({ value: "", disabled: true }, Validators.compose([
      //   Validators.required
      // ])),
      id: new FormControl(""),
      updateAt: new FormControl(""),
      abonos: new FormControl(""),
      vencimiento: new FormControl({ value: "", disabled: true }, Validators.compose([
        Validators.required
      ]))

    })
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    console.log("dismissModal");
    this.modalCtrl.dismiss(this.sale);
  }

  ngOnInit() {
    this.saleForm.setValue(this.sale);
    this.montoCuota = this.saleForm.get('montoCuota').value;

    this.saleForm.valueChanges.subscribe(selectedValue => {
      if(this.saleForm.get('amount') && this.saleForm.get('numeroCuotas') && this.saleForm.get('rate')){
        this.calcularMontoCuota();
      }
    })
  }

  async updateSaleConfirm(sale){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Actualizar <strong>préstamo</strong>',
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
            this.updateSale(sale);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateSale(sale){
    console.log("sale: ", sale)
  
    sale.updateAt = moment().format('llll');
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    //sale.customerId = this.customerId
    sale.interest = sale.amount * sale.rate/100;
    sale.amountWithRate = sale.amount + sale.interest;
    sale.montoCuota = sale.amountWithRate/sale.numeroCuotas;
    sale.cuotasPagadas = 0;
    sale.cuotasPendientes = sale.numeroCuotas; 
    sale.state = 'Active';
    sale.vencimiento = sale.cuotas[sale.numeroCuotas - 1].date;
    console.log('sale2: ', sale);  

    await this.salesService.updateSale(sale).then(res => { this.dismissModal() });
    
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

  // showConfirmation(){
  //   this.alertService.presentToast("Cliente creado satisfactoriamente!", 3000, top);
  //   //this.location.back();
  //   //close
  // }

  calcularMontoCuota(){
    let interest = this.saleForm.get('amount').value * this.saleForm.get('rate').value/100;
    let amountWithRate = this.saleForm.get('amount').value + interest;
    this.montoCuota = amountWithRate/this.saleForm.get('numeroCuotas').value;
  }

}
