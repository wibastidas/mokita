import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {
  public user;
  constructor(private router: Router,
              private actionSheetController: ActionSheetController,
              private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.isAuth().subscribe(res => {
      this.user = res.providerData[0];
      console.log("user: ", this.user);
    })
  }

  goNewSale(){
    this.router.navigateByUrl('/new-sale');
  }

  async showOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: this.user.displayName || this.user.email,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cerrar Sesión',
        icon: 'log-out-outline',
        handler: () => {
          console.log('Cerrar sesion clicked');
          this.authSvc.logout();
          this.router.navigate(['/login']);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  

}
