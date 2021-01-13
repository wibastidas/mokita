import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {
  user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) {}

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}