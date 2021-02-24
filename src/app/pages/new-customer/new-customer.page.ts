import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer, User } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { EventorService } from 'src/app/services/eventor.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit, OnDestroy {
  cobradores: User[];
  customerForm: FormGroup;
  isAdmin: boolean = false;
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
              public roleAutorization: RoleBasedAutorizationService,
              public eventorService: EventorService,
              private customersService: CustomersService,
              private alertService: AlertService,
              public authSvc: AuthService,
              public modalCtrl: ModalController) {

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
      createdAt: new FormControl(moment(new Date()).format("MM/DD/YYYY")),
      createdBy: null
    })
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

  ngOnInit() {

    if (this.authSvc.getLoggedUser()) {
      this.getInformation(); 
    } else {
      this.authSvc.getLoggedUser$().subscribe(value => {
        this.getInformation(); 
      });
    }
    
  }

  getInformation(){
    this.isAdmin = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
    
    if(this.isAdmin) {
      this.customersService.getVendedoresByAdmin(this.authSvc.getLoggedUser().uid).subscribe((data) => {
 
        this.cobradores = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as User
          } 
        });
      });
    }
 
  }
  
  async alertConfirm(customer: Customer){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      mode:"ios",
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
    customer.createdBy = this.authSvc.getLoggedUser().uid;
    if(this.authSvc.getLoggedUser().createdBy) {
      //Lo esta creando un cobrador. Aunque no se soporta este permiso actualmente
      customer.adminId = this.authSvc.getLoggedUser().createdBy;
      customer.cobradorId = this.authSvc.getLoggedUser().uid;
    } else {
      customer.adminId = this.authSvc.getLoggedUser().uid;

      //Pendiente .... Obtener y mostrar cobradores
      customer.cobradorId = null;
    }
    this.customersService.getCustomerByDocument(customer.document).pipe(take(1))
    .subscribe(async cliente => {
      console.log('cliente: ', cliente);
      if(cliente.length > 0) {
        this.alertService.presentToast("El numero de cédula ya fue registrado.", 2000, "top" ,"secondary");
      } else {
        await this.customersService.createNewCustomer(customer).then(res => { console.log('res: ', res) });

        //this.eventorService.emit('CUSTOMER_SEGMENT_CHANGED', { type: "registeredCustomer", document: customer.document });
      }
      this.dismissModal();
    });
  }

  // update(customer: Customer) {
  //   this.customersService.updateCustomer(customer);
  // }

  // delete(id: string) {
  //   this.customersService.deleteCustomer(id);
  // }

}


