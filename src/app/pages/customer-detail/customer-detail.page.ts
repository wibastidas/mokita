import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer, Sale, User } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
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
  isAdmin: boolean = false;
  customerId: string;
  cobradores: any;
  cobradorSelected;
  type: string;
  sales: Sale[];
  loadingCustomerInformation = false;
  phoneNumber;
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
              public authSvc: AuthService, 
              private alertService: AlertService,
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
      createdAt: new FormControl(moment(new Date()).format("MM/DD/YYYY")),
      createdBy: "",
      adminId: "",
      cobradorId: "",
      id: new FormControl("")
    })
    
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

    this.loadingCustomerInformation = true;
    this.customersService.getCustomerById(this.customerId).subscribe((res:Customer) => {
      this.loadingCustomerInformation = false;
      res.id = this.customerId;
      this.customer = res
      this.phoneNumber = res.phoneNumber;
      this.customerForm.setValue(res);
      this.getSalesByCustomerId();
    });
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
    this.alertService.presentToast("Cliente Actualizado!.", 2000, "top" ,"success");
  }

  segmentChanged(ev : any){
    console.log('segmentChanged ev:  ', ev.detail.value);
  }

  deleteSale(sale){
    console.log("deleteSale: ", sale);
    this.salesService.deleteSale(sale.id).then(res => this.getSalesByCustomerId());
  }

  goSaleDetail(sale){
    this.router.navigateByUrl('/home/customers/sale-detail/' + sale.id + '/' + this.customer.name + '/' + this.customer.lastName + '/' + this.customer.phoneNumber);
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
      mode:"ios",
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

  openWhatsapp(){
    window.open(`https://wa.me/${this.phoneNumber}`)
  }

  openCall(){
    window.open('tel:+' + this.phoneNumber, '_system');
  }

}
