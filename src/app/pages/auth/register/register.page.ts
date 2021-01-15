import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public isCobrador: any = null;
  public user;

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authSvc.getCurrentUser().then(userRole => {
      console.log("userRole: ", userRole)
      if(userRole){
        let isAdminCreator = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        if(isAdminCreator) {
          this.isCobrador = true;
        }
      }
    });
  }
  
  async onRegister(email, password, isCobrador) {
    try {
      const user = await this.authSvc.registerUser(email.value, password.value, isCobrador);
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
    }
  }
}