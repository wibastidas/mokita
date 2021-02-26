import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reporte-prestamos-nuevos',
  templateUrl: './reporte-prestamos-nuevos.page.html',
  styleUrls: ['./reporte-prestamos-nuevos.page.scss'],
})
export class ReportePrestamosNuevosPage implements OnInit {
  public prestamos$: Observable<any>;
  public title: string;
  public from: string;
  public to: string;


  constructor( public navParams: NavParams, 
               private modalCtrl: ModalController,
               private router: Router,) { 
    console.log(navParams.get('prestamos'));

  }

  ngOnInit() {

    this.prestamos$ = this.navParams.get('prestamos');
    this.title = this.navParams.get('title');
    this.from = this.navParams.get('from');
    this.to = this.navParams.get('to');
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
