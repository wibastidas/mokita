import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert;
  toast;

  constructor(private alertController: AlertController,
              private toastController: ToastController) { }

  async presentAlert(header, message, buttons, cssClass?){
    this.alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass
    });

    await this.alert.present();
  }

  async presentToast(message, duration, position, buttons?, color? ) {
    this.toast = await this.toastController.create({
      message,
      duration,
      position,
      buttons,
      color
    });
    this.toast.present();
  }


}
