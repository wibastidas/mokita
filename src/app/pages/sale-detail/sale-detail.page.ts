import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
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
    });
  }

  async agregarAbono(fee) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Realizar Abono!',
      inputs: [
        {
          name: 'monto',
          type: 'number',
          placeholder: 'Monto',
          value: fee
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
              console.log('Confirm Ok:', data);
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
      console.log("dataaaa: ", data['data'].dismissed)
    });

    return await modal.present();
  }

}
