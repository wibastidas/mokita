import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts={
    autoplay:true,
    loop:true
  }
  constructor(private navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }

  async goLogin()
  {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('login', { replaceUrl:true });
  }

  goSignup()
  {
    this.navCtrl.navigateRoot('register');
  }

}
