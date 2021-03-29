import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddtransactionsPage } from '../pages/modals/addtransactions/addtransactions.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private modalCtrl: ModalController) {}

  async openAddTransactionModal() {

    const modal = await this.modalCtrl.create({
      component: AddtransactionsPage,
      backdropDismiss: true
    });

    return await modal.present();
  }

}
