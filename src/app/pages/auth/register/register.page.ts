import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public isAdmin: any = null;

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){

    this.authSvc.isAuth().subscribe(auth => {
      if(auth) {
        this.authSvc.isUserAdmin(auth.uid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          console.log("this.isAdmin?: ", this.isAdmin);
        })
      }
    })

  }
  
  async onRegister(email, password, isAdmin) {
    try {
      const user = await this.authSvc.register(email.value, password.value, isAdmin);
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