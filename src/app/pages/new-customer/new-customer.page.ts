import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { EventorService } from 'src/app/services/eventor.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  customers: Customer[];
  customerForm: FormGroup;
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
  constructor(private formBuilder: FormBuilder, 
              public alertController: AlertController,
              public eventorService: EventorService,
              private customersService: CustomersService,
              private alertService: AlertService) {

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
      createdAt: new FormControl(moment().format("YYYY-MM-DD HH:mm:ss"))
    })
  }

  ngOnInit() {
    // this.customersService.getCustomers().pipe(take(1)).subscribe(clientes => {
    //   console.log('clientes: ', clientes);
    // });
  }
  
  async alertConfirm(customer: Customer){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Registrar <strong>nuevo cliente</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log("createCustomer: ", customer);
            this.createCustomer(customer);
          }
        }
      ]
    });
    await alert.present();
  }

  createCustomer(customer: Customer){
    this.customersService.getCustomerByDocument(customer.document).pipe(take(1))
    .subscribe(async cliente => {
      console.log('cliente: ', cliente);
      if(cliente.length > 0) {
        this.alertService.presentToast("El numero de cédula ya fue registrado.", 2000, "top" ,"primary");
      } else {
        await this.customersService.createNewCustomer(customer).then(res => { console.log('res: ', res) });

        this.eventorService.emit('CUSTOMER_SEGMENT_CHANGED', { type: "registeredCustomer", document: customer.document });
      }
    });
  }

  update(customer: Customer) {
    this.customersService.updateCustomer(customer);
  }

  delete(id: string) {
    this.customersService.deleteCustomer(id);
  }

}


