import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Customer } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit, OnDestroy {
  customerForm: FormGroup;
  @Input() customerId: string;
  customer: Customer;
  type: string;
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
              private alertService: AlertService,
              private formBuilder: FormBuilder) {
    this.type = "loansInformation";

    this.customerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl("", Validators.compose([
        Validators.required
      ])),
      document: new FormControl("", Validators.compose([
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
      createdAt: new FormControl(moment().format("YYYY-MM-DD HH:mm:ss")),
      id: new FormControl("")
    })
    
  }

  ngOnInit() {
    console.log("customerId: ", this.customerId);
    this.customersService.getCustomerById(this.customerId).subscribe((res:Customer) => {
      console.log("res: ", res)
      this.customer = res
      this.customerForm.setValue(res);
    });
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
    console.log("this.customerForm: ", this.customerForm)
    console.log("this.customer: ", this.customer)

    this.customersService.updateCustomer(this.customerForm.value);
  }

  segmentChanged(ev : any){
    console.log('segmentChanged ev:  ', ev.detail.value);
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

}
