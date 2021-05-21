import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        console.log('user: ', user)
        if (user) {
          this.router.navigateByUrl('/home/route');
        } else {
          resolve(true);
        }
      });
    });
  }
}