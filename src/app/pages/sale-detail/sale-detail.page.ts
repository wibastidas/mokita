import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Sale } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.page.html',
  styleUrls: ['./sale-detail.page.scss'],
})
export class SaleDetailPage implements OnInit {
  saleForm: FormGroup;
  sale: Sale;
  saleId: string;
  loading: Boolean= false;
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

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder, 
              public alertController: AlertController,
              public alertService: AlertService,
              public salesService: SalesService ) {

    this.saleId = this.route.snapshot.paramMap.get('id');

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
      fee: new FormControl("", Validators.compose([
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
    })
  }

  ngOnInit() {
    this.salesService.getSaleById
    this.loading = true;

    this.salesService.getSaleById(this.saleId).subscribe((res: Sale) => {
      this.loading = false;

      console.log("res: ", res)

      this.sale = res;
      this.saleForm.setValue(res);
    });
  }

  async pdateSaleConfirm(sale){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Actualizar <strong>venta</strong>',
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
  
    //sale.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    sale.cuotas = this.createCuotas(sale.numeroCuotas);
    //sale.customerId = this.customerId
    sale.interest = sale.amount * sale.rate/100;
    sale.amountWithRate = sale.amount + sale.interest;
    sale.fee = sale.amountWithRate/sale.numeroCuotas;
    sale.paidFees = 0;
    sale.pendingFees = sale.cuotas; 
    sale.state = 'Active';
    console.log('sale2: ', sale);
  
    //await this.salesService.updateSale(sale).then(res => { this.showConfirmation() });
    
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

  showConfirmation(){
    this.alertService.presentToast("Cliente creado satisfactoriamente!", 3000, top)
  }

}
