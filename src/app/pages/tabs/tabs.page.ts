import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddtransactionsPage } from '../modals/addtransactions/addtransactions.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private modalCtrl: ModalController) {}

  async openAddTransactionModal() {

    const modal = await this.modalCtrl.create({
      component: AddtransactionsPage,
      backdropDismiss: true
    });

    return await modal.present();
  }

}
