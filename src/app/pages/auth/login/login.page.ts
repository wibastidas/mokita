
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm : FormGroup;

  error_messages = {
    'email':[
      { type:'required', message: 'El correo es requerido.'},
      { type:'minlength', message: 'La longitud del correo debe ser mayor o igual a 6 caracteres.'},
      { type:'maxlength', message: 'La longitud del correo no puede superar los 30 caracteres.'},
      { type:'pattern', message: 'Por favor ingrese un formato de correo válido.'}
    ],
    'password':[
      { type:'required', message: 'La contraseña es requerida.'},
    ]
  }

  constructor(public authSvc: AuthService, 
              private router: Router, 
              public formBuilder:FormBuilder, 
              private navCtrl:NavController) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(30),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    })
  }

  goSignup()
  {
    this.navCtrl.navigateForward('/register');
  }

  async login(data) {
    try {
      const user = await this.authSvc.login(data.email, data.password);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  goForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
}