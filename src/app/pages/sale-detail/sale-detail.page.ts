import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Sale } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { SalesService } from 'src/app/services/sales.service';
import { EditSalePage } from '../edit-sale/edit-sale.page';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.page.html',
  styleUrls: ['./sale-detail.page.scss'],
})
export class SaleDetailPage implements OnInit {
  sale: Sale;
  saleId: string;
  loading: Boolean= false;

  constructor(private route: ActivatedRoute,
              public alertController: AlertController,
              public alertService: AlertService,
              public salesService: SalesService,
              private modalController: ModalController) {
    this.saleId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.loading = true;

    this.salesService.getSaleById(this.saleId).subscribe((res: Sale) => {
      this.loading = false;
      this.sale = res;
      this.sale.id = this.saleId;
      console.log("sale: ", this.sale);
    });
  }

  async agregarAbono(montoCuota) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Realizar Abono!',
      inputs: [
        {
          name: 'monto',
          type: 'number',
          placeholder: 'Monto',
          value: montoCuota
        },
        {
          name: 'note',
          type: 'textarea',
          placeholder: 'Notas'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if(data.monto){
              this.sale.abonos.push({...data, createdAt: moment().format('llll')});
              this.updateSale();
            }
          }
        }
      ]
    });

    await alert.present();
  }

   async editSaleDetail(sale) {

    const modal = await this.modalController.create({
      component: EditSalePage,
      componentProps: {
        sale
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      //console.log("dataaaa: ", data['data'].dismissed)
    });

    return await modal.present();
  }

  async updateSale(){
    console.log("updateSale: ", this.sale);
    this.sale.updatedAt = moment().format('llll');
    await this.salesService.updateSale(this.sale).then(res => { console.log("modificado!!!") }); 
  }

  deleteAbono(index) {
    this.sale.abonos.splice(index, 1);
    this.updateSale();
  }

  async confirmDelete(index){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Eliminar <strong>abono</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.deleteAbono(index);
          }
        }
      ]
    });
    await alert.present();
  }

  async editarAbono(index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Realizar Abono!',
      inputs: [
        {
          name: 'monto',
          type: 'number',
          placeholder: 'Monto',
          value: this.sale.abonos[index].monto
        },
        {
          name: 'note',
          type: 'textarea',
          placeholder: 'Notas',
          value: this.sale.abonos[index].note
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            console.log("data: ", data)
            console.log("hola", this.sale.abonos[index])
            if(data.monto){
              this.sale.abonos[index] = { ...data, createdAt: this.sale.abonos[index].createdAt ,updated: moment().format('llll')}
              this.updateSale();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
