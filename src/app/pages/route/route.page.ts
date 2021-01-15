import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RoleBasedAutorizationService } from 'src/app/services/role-based-autorization.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {
  public user;
  public isAdmin: any = null;
  constructor(private router: Router,
              private actionSheetController: ActionSheetController,
              private authSvc: AuthService, 
              public roleAutorization: RoleBasedAutorizationService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authSvc.getCurrentUser().then(userRole => {
      console.log("userRole: ", userRole)
      if(userRole){
        this.user = userRole;
        this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
      }
    });
  }

  goNewSale(){
    this.router.navigateByUrl('/new-sale');
  }

  async showOptions() {
    let buttonsActionSheet = [{
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
    }];

    if (this.roleAutorization.canCreateUser(this.user)) {
      buttonsActionSheet.unshift({
        text: 'Crear Usuario',
        icon: 'person-add-outline',
        handler: () => {
          this.router.navigate(['/register']);
        }
      })
    }
    
    const actionSheet = await this.actionSheetController.create({
      header: this.user.displayName || this.user.email,
      cssClass: 'my-custom-class',
      buttons: buttonsActionSheet
    });
    await actionSheet.present();
  }

  

}
