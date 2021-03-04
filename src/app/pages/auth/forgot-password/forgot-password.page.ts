import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  signupForm : FormGroup;
  message: string;
  error_messages = {
    'email':[
      { type:'required', message: 'El correo es requerido.'},
      { type:'minlength', message: 'La longitud del correo debe ser mayor o igual a 6 caracteres.'},
      { type:'maxlength', message: 'La longitud del correo no puede superar los 30 caracteres.'},
      { type:'pattern', message: 'Por favor ingrese un formato de correo válido.'}
    ]
  }
  constructor(public authSvc: AuthService, 
              private router: Router,
              private navCtrl: NavController,
              public formBuilder:FormBuilder
    ) {
    this.signupForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$')
      ]))
    })
  }

  async onResetPassword(data) {
    try {
      await this.authSvc.resetPassword(data.email);
      //this.router.navigate(['/login']);
      this.message = "Enviamos un enlace de recuperación a tu correo, por favor crea una nueva contraseña e inicia sesión nuevamente."
    } catch (error) {
      console.log('Error->', error);
    }
  }

  goSignup()
  {
    this.navCtrl.navigateForward('/login');
  }
}