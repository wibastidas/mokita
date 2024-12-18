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
    porcentaje: [
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
      porcentaje: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cuotas: new FormControl([]),
      montoConInteres: new FormControl(""),
      montoCuota: new FormControl({ value: "", disabled: true }),
      estado: new FormControl({ value: "", disabled: true }),
      createdAt: new FormControl({ value: "", disabled: true }),
      customerId: new FormControl(""),
      cuotasPagadas: new FormControl(""),
      cuotasPendientes: new FormControl(""),
      intereses: new FormControl(""),
      updatedAt: new FormControl(""),
      // vencimiento: new FormControl({ value: "", disabled: true }, Validators.compose([
      //   Validators.required
      // ])),
      id: new FormControl(""),
      abonos: new FormControl(""),
      saldo: new FormControl(""),
      createdBy: "",
      porcentajePagado: "",
      adminId: "",
      fechaUltimoPago: "",
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
    this.modalCtrl.dismiss(this.sale);
  }

  ngOnInit() {
    this.saleForm.patchValue(this.sale);
    this.montoCuota = this.saleForm.get('montoCuota').value;

    this.saleForm.valueChanges.subscribe(selectedValue => {
      if(this.saleForm.get('amount') && this.saleForm.get('numeroCuotas') && this.saleForm.get('porcentaje')){
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

    sale.updatedAt = moment(new Date()).format("MM/DD/YYYY");
    sale.cuotas = "";//this.createCuotas(sale.numeroCuotas);
    //sale.customerId = this.customerId
    sale.intereses = sale.amount * sale.porcentaje/100;
    sale.montoConInteres = sale.amount + sale.intereses;
    sale.montoCuota = sale.montoConInteres/sale.numeroCuotas;
    sale.cuotasPagadas = 0;
    sale.cuotasPendientes = sale.numeroCuotas; 
    sale.estado = 'Activo';
    sale.vencimiento = this.calcularFechaVencimiento(sale.numeroCuotas);
    sale.cuotasPendientes = sale.saldo/sale.montoCuota
    sale.cuotasPagadas = sale.numeroCuotas - sale.cuotasPendientes;
    sale.saldo = this.calcularSaldoPendiente(sale);

    await this.salesService.updateSale(sale).then(res => { this.dismissModal() });
    
  }

  calcularSaldoPendiente(sale){
    let saldo = sale.montoConInteres;
    if(sale && sale.abonos && sale.abonos.length > 0) {
      saldo = sale.montoConInteres - this.calcularAbonos(sale.abonos);
    }
    return saldo;
  }

  calcularAbonos(abonos){
    return abonos.reduce((total, abono) => total + abono.monto, 0);
  }

  // createCuotas(numeroCuotas){
  //   let dates = [];

  //   let cont;
  //   let numeroCuotasTmp = numeroCuotas;

  //   for(cont=1; cont <= numeroCuotasTmp; cont++ ) {

  //     if(moment(moment().add(cont,'days').format('YYYY-MM-DD')).format('dddd') !== 'domingo'){
  //       dates.push({
  //         cuota: dates.length + 1,
  //         date: moment().add(cont,'days').format("MM/DD/YYYY"),
  //         fechaPago: null,
  //       });
  //     } else {
  //       numeroCuotasTmp = numeroCuotasTmp + 1;
  //     }
  //   }
  //   return dates;
  // }

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

  // showConfirmation(){
  //   this.alertService.presentToast("Cliente creado satisfactoriamente!", 3000, top);
  //   //this.location.back();
  //   //close
  // }

  calcularMontoCuota(){
    let intereses = this.saleForm.get('amount').value * this.saleForm.get('porcentaje').value/100;
    let montoConInteres = this.saleForm.get('amount').value + intereses;
    this.montoCuota = montoConInteres/this.saleForm.get('numeroCuotas').value;
  }

}
