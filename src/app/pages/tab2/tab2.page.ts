import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EventorService } from 'src/app/services/eventor.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {
  type: string;

  constructor(public eventorService: EventorService,
              public toastController: ToastController) {
    this.type = "newCustomer";
  }

  public ngOnInit(): void {
    this.eventorService.getEmitter('CUSTOMER_SEGMENT_CHANGED').subscribe(data => {
      console.log('CUSTOMER_SEGMENT_CHANGED: ', data);
      this.type = data.type
      this.presentToast();
    });
  }

  segmentChanged(ev : any){
    console.log('segmentChanged ev:  ', ev.detail.value);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cliente creado satisfactoriamente!',
      duration: 4000,
      position: "top",
      color:"primary",
      buttons: [
         {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
