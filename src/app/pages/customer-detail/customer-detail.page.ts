import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer, Sale } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit, OnDestroy {
  customerForm: FormGroup;
  customer: Customer; 
  customerId: string;
  type: string;
  sales: Sale[];
  loadingCustomerInformation = false;
  loadingLoansInformation = false;
  validation_messages = {
    name: [
      { type:"required", message: "El nombre es requerido."}
    ],
    lastName: [
      { type:"required", message: "El apellido es requerido."}
    ],
    document: [
      { type:"required", message: "La cédula es requerida."}
    ],
    phoneNumber: [
      { type:"required", message: "El celular es requerido."}
    ],
    address: [
      { type:"required", message: "La dirección es requerida."}
    ],
    email: [
      { type:"required", message: "El correo es requerido."},
      { type: "pattern", message: "Este no es un email válido." }
    ],
    reference: [
      { type:"required", message: "La referencia es requerida."}
    ]
  }

  constructor(public modalCtrl: ModalController,
              public customersService:CustomersService,
              private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              public alertController: AlertController,
              private router: Router,
              private authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService,
              public salesService: SalesService) {

    
    this.customerId = this.route.snapshot.paramMap.get('id');
    console.log("customerId: ", this.customerId)

    this.type = "loansInformation";

    this.customerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl("", Validators.compose([
        Validators.required
      ])),
      document: new FormControl({value: '', disabled: true}, Validators.compose([
        Validators.required
      ])),
      phoneNumber: new FormControl("", Validators.compose([
        Validators.required
      ])),
      address: new FormControl("", Validators.compose([
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      reference: new FormControl("", Validators.compose([
       // Validators.required,
      ])),
      createdAt: new FormControl(moment().format('llll')),
      id: new FormControl("")
    })
    
  }
  

  ngOnInit() {
    //this.customerForm.setValue(this.customer);
    this.loadingCustomerInformation = true;
    this.customersService.getCustomerById(this.customerId).subscribe((res:Customer) => {
      this.loadingCustomerInformation = false;
      // console.log("res: ", res)
      res.id = this.customerId;
      console.log("res: ", res)

      this.customer = res
      this.customerForm.setValue(res);
      this.getSalesByCustomerId();
    });


    // this.customersService.getCustomerById(this.customerId).subscribe(data => {
    //   let customer = {
        
    //       id: data.payload.doc.id,
    //       ...e.payload.doc.data() as Customer
        
    //   }
    //   console.log("data: ", data)
    // });

    
  }

  getSalesByCustomerId() {
    this.loadingLoansInformation = true;
    this.salesService.getSalesByCustomerId(this.customer.id).pipe(take(1))
    .subscribe(async sales => {
      this.loadingLoansInformation = false;
      this.sales = sales.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Sale
        } 
      });
      console.log("this.sales: ", this.sales)
    });
  }

  ngOnDestroy() {
    // if (window.history.estado.modal) {
    //   history.back();
    // }
  }

  // @HostListener('window:popstate', ['$event'])
  // dismissModal(updated) {

  //   this.modalCtrl.dismiss({
  //     'dismissed': updated
  //   });
  // }

  updateCustomer(){
    this.customersService.updateCustomer(this.customerForm.value).then(res => res);
  }

  segmentChanged(ev : any){
    console.log('segmentChanged ev:  ', ev.detail.value);
  }

  deleteSale(sale){
    console.log("deleteSale: ", sale);
    this.salesService.deleteSale(sale.id).then(res => this.getSalesByCustomerId());
  }

  goSaleDetail(sale){
    this.router.navigateByUrl('/sale-detail/' + sale.id);
  }

  // createCustomer(customer: Customer){
  //   this.customersService.getCustomerByDocument(customer.document).pipe(take(1))
  //   .subscribe(async cliente => {
  //     console.log('cliente: ', cliente);
  //     if(cliente.length > 0) {
  //       this.alertService.presentToast("El numero de cédula ya fue registrado.", 2000, "top" ,"primary");
  //     } else {
  //       await this.customersService.createNewCustomer(customer).then(res => { console.log('res: ', res) });

  //       //this.eventorService.emit('CUSTOMER_SEGMENT_CHANGED', { type: "registeredCustomer", document: customer.document });
  //     }
  //   });
  // }

  async deleteSaleConfirm(sale){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar!',
      message: 'Eliminar <strong>préstamo</strong>',
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
            this.deleteSale(sale);
          }
        }
      ]
    });

    await alert.present();
  }

}
