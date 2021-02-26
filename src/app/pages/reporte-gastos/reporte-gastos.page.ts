import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reporte-gastos',
  templateUrl: './reporte-gastos.page.html',
  styleUrls: ['./reporte-gastos.page.scss'],
})
export class ReporteGastosPage implements OnInit {
  public gastos: [];
  public from: string;
  public to: string;
  public montoTotal;

  constructor(public navParams: NavParams, 
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.gastos = this.navParams.get('gastos');
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
