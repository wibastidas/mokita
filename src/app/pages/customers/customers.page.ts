import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Customer } from 'src/app/interfaces/interfaces';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomerDetailPage } from '../customer-detail/customer-detail.page';
import { NewCustomerPage } from '../new-customer/new-customer.page';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  customers: Customer[];
  loading: Boolean= false;

  constructor(private customersService: CustomersService,
              public alertController: AlertController,
              private router: Router,
              private modalController: ModalController) { }

  ngOnInit() {
    // this.customersService.getCustomers().pipe(take(1)).subscribe((customers: Customer[]) => {
    //   console.log('customers: ', customers);
    //   this.customers = customers;
    //   //DD/MM/YYYY HH:mm:ss"
    //   const format1 = "MMMM Do YYYY, h:mm:ss a"
    //   const format2 = "YYYY-MM-DD"

    //   let dateTime1A = moment(customers[1].createdAt).format(format1);
    //   let dateTime2B = moment(customers[1].createdAt).format(format2);

    //   console.log("dateTime1A: ", dateTime1A);
    //   console.log("dateTime2B: ", dateTime2B);

    //   // console.log("moment(): ", moment(customers[0].date).format('MM/DD/YYYY'));
    // });


    // this.customersService.getCustomers().subscribe((data: Customer[]) => {
    //   console.log("data*: ", data)
    //   this.customers = data;
      
    //   // .map(e => {
    //   //   return {
    //   //     id: e.payload.doc.id,
    //   //     ...e.payload.doc.data() as Customer
    //   //   } 
    //   // });
    //   console.log("this.customers: ", this.customers)

    // });


    // this.customersService.getCustomersNew().pipe();

    this.getCustomers();   
  }

  getCustomers(){
    this.loading = true;
    this.customersService.getCustomersNew().subscribe(data => {
      this.customers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Customer
        } 
      });
      console.log("this.customers: ", this.customers)
      this.loading = false;
    });
  }

  async goCustomerDetail(customer) {

    const modal = await this.modalController.create({
      component: CustomerDetailPage,
      componentProps: {
        customer: customer
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      console.log("dataaaa: ", data['data'].dismissed)
      if (data['data'].dismissed)  this.getCustomers();
    });

    return await modal.present();
  }

  goCustomerDetail2(customer){
    this.router.navigateByUrl('/customer-detail/' + customer.id);
  }

  async createCustomer() {

    const modal = await this.modalController.create({
      component: NewCustomerPage,
    });
    return await modal.present();
  }


  async deleteCustomer(customer) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Cliente!',
      message: 'El cliente será eliminado ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.customersService.deleteCustomer(customer.id).then(m => this.getCustomers());
          }
        }
      ]
    });

    await alert.present();
    
  }




}
