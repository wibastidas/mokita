import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reporte-prestamos',
  templateUrl: './reporte-prestamos.page.html',
  styleUrls: ['./reporte-prestamos.page.scss'],
})
export class ReportePrestamosPage implements OnInit {
  public prestamos$: Observable<any>;
  public title: string;
  public from: string;
  public to: string;
  public montoTotal;


  constructor( public navParams: NavParams, 
               private modalCtrl: ModalController) { 
  }

  ngOnInit() {

    this.prestamos$ = this.navParams.get('prestamos');
    this.title = this.navParams.get('title');
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

  updateMyDate($event) {
    console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  }

}
