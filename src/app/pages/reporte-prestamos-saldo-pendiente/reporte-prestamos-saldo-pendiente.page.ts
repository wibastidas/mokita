import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reporte-prestamos-saldo-pendiente',
  templateUrl: './reporte-prestamos-saldo-pendiente.page.html',
  styleUrls: ['./reporte-prestamos-saldo-pendiente.page.scss'],
})
export class ReportePrestamosSaldoPendientePage implements OnInit {
  public prestamos: [];
  public from: string;
  public to: string;
  public montoTotal;

  constructor(public navParams: NavParams, 
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.prestamos = this.navParams.get('prestamos');
    this.from = this.navParams.get('from');
    this.to = this.navParams.get('to');
    this.montoTotal = this.navParams.get('montoTotal');

  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal(updated) {

    this.modalCtrl.dismiss({
      'dismissed': updated
    });
  }

}
