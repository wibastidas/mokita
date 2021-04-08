import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Plugins } from '@capacitor/core';
import 'firebase/auth';
import { Observable } from 'rxjs';
const { Storage } = Plugins;

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      const hasSeenIntro = await Storage.get({ key: INTRO_KEY });
      if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
        resolve(true);
      } else {
        this.router.navigate(['/intro']);
        resolve(false);
      }

    });
  }
}