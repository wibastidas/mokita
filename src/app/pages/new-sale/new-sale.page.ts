import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.page.html',
  styleUrls: ['./new-sale.page.scss'],
})
export class NewSalePage implements OnInit {
  type: string;

  constructor() {
    this.type = "newCustomer";
  }

  ngOnInit() {
  }

segmentChanged(ev : any){
  console.log('segmentChanged ev:  ', ev.detail.value);
}

}
