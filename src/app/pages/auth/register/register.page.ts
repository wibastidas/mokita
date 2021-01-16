import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public isNewUserCobrador: any = null;
  public user;

  constructor(private authSvc: AuthService, private router: Router) {}

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
  
  async onRegister(email, password, isNewUserCobrador) {
    try {
      const user = await this.authSvc.registerUser(email.value, password.value, isNewUserCobrador);
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
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['verify-email']);
      //this.authSvc.setLoggedUser(null);
      //pendiente no hacer login con el usuario creado cuando es un cobrador
    }
  }
}