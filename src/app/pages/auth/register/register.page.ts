import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public isNewUserCobrador: any = null;
  public user;
  signupForm : FormGroup;
  
  error_messages = {
    // 'username':[
    //   { type:'required', message: 'El nombre y apellidos son requeridos'},
    //   { type:'minlength', message: 'El nombre y apellidos deben ser mayor o igual a 6 caracteres.'},
    //   { type:'maxlength', message: 'El nombre y apellidos no pueden superar los 30 caracteres.'},
    // ],
    'email':[
      { type:'required', message: 'El correo es requerido.'},
      { type:'minlength', message: 'La longitud del correo debe ser mayor o igual a 6 caracteres.'},
      { type:'maxlength', message: 'La longitud del correo no puede superar los 30 caracteres.'},
      { type:'pattern', message: 'Por favor ingrese un formato de correo válido.'}
    ],
    'password':[
      { type:'required', message: 'La contraseña es requerida.'},
      { type:'minlength', message: 'La contraseña debe ser mayor o igual a 6 caracteres.'},
      { type:'maxlength', message: 'La contraseña no puede superar los 30 caracteres.'},
      { type:'pattern', message: 'La contraseña debe contener números, letras mayúsculas y minúsculas.'}
    ],
    'terms': [
      { type:'required', message: 'Debe aceptar los Términos y Condiciones.'},
    ]
  }

  constructor(public authSvc: AuthService, 
              private router: Router,
              public formBuilder:FormBuilder,
              private navCtrl:NavController) {
    this.signupForm = this.formBuilder.group({
      // username: new FormControl('',Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6),
      //   Validators.maxLength(30),
      //   Validators.pattern('^[a-zA-Z0-9_.+-]+$')
      // ])),
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      terms: new FormControl(undefined,Validators.compose([
        Validators.requiredTrue
      ]))
    })
              }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){

    if(this.authSvc.getLoggedUser()){
      let isAdminCreator = Object.assign({}, this.authSvc.getLoggedUser().roles).hasOwnProperty('admin');
      if (isAdminCreator) {
        this.isNewUserCobrador = true;
      }
    }

  }
  
  async signup(data, isNewUserCobrador) {
    try {
      let createdBy = null;
      if (isNewUserCobrador) {
        createdBy = this.authSvc.getLoggedUser().uid;
      } 
      const user = await this.authSvc.registerUser(data.email, data.password, isNewUserCobrador, createdBy);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
      //this.authSvc.setLoggedUser(null);
      //pendiente no hacer login con el usuario creado cuando es un cobrador
    }
  }
}