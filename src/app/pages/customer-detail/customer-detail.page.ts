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

  constructor(public modalCtrl: ModalController,
              public customersService:CustomersService ) { }

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
    this.customer.address = "Nueva Direccion"
    console.log("updateCustomer", this.customer);
    this.customersService.updateCustomer(this.customer);
  }

}
