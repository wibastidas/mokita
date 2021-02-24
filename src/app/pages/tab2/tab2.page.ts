import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { EventorService } from 'src/app/services/eventor.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {
  type: string;

  constructor(public eventorService: EventorService,
              public alertService: AlertService) {
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

  presentToast() {
    this.alertService.presentToast(
      'Cliente creado satisfactoriamente!',
      4000,
      "top",
      "secondary",
      [
         {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    );
  }

}
