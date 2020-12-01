import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customer } from 'src/app/interfaces/interfaces';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit, OnDestroy {
  @Input() customer: Customer;
  type: string;

  constructor(public modalCtrl: ModalController,
              public customersService:CustomersService ) {
    this.type = "loansInformation";

  }

  ngOnInit() {
    console.log("customer:: ", this.customer)
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    console.log("dismissModal");
    this.modalCtrl.dismiss();
  }

  updateCustomer(){
    this.customersService.updateCustomer(this.customer);
  }

  segmentChanged(ev : any){
    console.log('segmentChanged ev:  ', ev.detail.value);
  }

}
