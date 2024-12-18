import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
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
  lastName: string;
  name: string;
  phoneNumber: string;

  // loading: Boolean= false;
  public sale$: Observable<any>

  constructor(private route: ActivatedRoute,
              public alertController: AlertController,
              public alertService: AlertService,
              public salesService: SalesService,
              public authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService,
              private modalController: ModalController) {
    this.saleId = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.lastName = this.route.snapshot.paramMap.get('lastName');
    this.phoneNumber = this.route.snapshot.paramMap.get('phoneNumber');
  }

  ngOnInit() {
    this.sale$ = this.salesService.getSaleById(this.saleId);
  }

  async agregarAbono(montoCuota, sale) {
    this.sale = sale;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Realizar Abono!',
      mode: "ios",
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
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if(data.monto){
              this.sale.abonos.push({monto: parseInt(data.monto), note: data.note, createdAt: moment(new Date()).format("MM/DD/YYYY"), createdBy: this.authSvc.getLoggedUser().uid});
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
    this.sale.updatedAt = moment(new Date()).format("MM/DD/YYYY")
    this.sale.saldo = this.calcularSaldoPendiente(this.sale);
    this.sale.cuotasPendientes = this.sale.saldo/this.sale.montoCuota
    this.sale.cuotasPagadas = this.sale.numeroCuotas - this.sale.cuotasPendientes;
    if(this.sale.cuotasPendientes <= 0){
      this.sale.estado = "Pagado"
      this.sale.fechaUltimoPago = moment(new Date()).format("MM/DD/YYYY");
    } else {
      this.sale.estado = "Activo"
      this.sale.fechaUltimoPago = "";
    }
    await this.salesService.updateSale(this.sale);
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

  deleteAbono(index) {
    this.sale.abonos.splice(index, 1);
    this.updateSale();
  }

  async confirmDelete(index, sale){
    this.sale = sale;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      mode: "ios",
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

  async editarAbono(index, sale) {
    this.sale = sale;

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Abono!',
      mode: "ios",
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
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if(data.monto){
              this.sale.abonos[index] = { monto: parseInt(data.monto), note: data.note, createdAt: this.sale.abonos[index].createdAt ,updated: moment(new Date()).format("MM/DD/YYYY")}
              this.updateSale();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  openWhatsapp(sale){

    window.open(`https://wa.me/${this.phoneNumber.replace(/\D/g,'')}?text=ACTUALIZACIÓN DE PRÉSTAMO! Cuotas pagadas: ${sale.cuotasPagadas}, Cuotas pendiente: ${sale.cuotasPendientes}, Saldo pendiente: $${sale.saldo} , Vence el ${ moment(sale.vencimiento).format("LLLL")}`)
  }

  openCall(){
    window.open('tel:+' + this.phoneNumber.replace(/\D/g,''), '_system');
  }

}
