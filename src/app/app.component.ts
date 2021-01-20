import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {    
    this.initializeApp();
  }

  initializeApp() {
    moment.locale('es')
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authService.isAuth().subscribe(auth => {
      if(auth) {
        this.authService.getUser(auth.uid).subscribe(user => {
          this.authService.setLoggedUser(user);
          this.authService.saveLoggedUser(user);
        })
      }
    })

  }
}
