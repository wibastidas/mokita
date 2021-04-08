import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AutoLoginGuard implements CanActivate {
  constructor(public authSvc: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authSvc.getLoggedUser) {
      console.log("AutoLoginGuard home");
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log("AutoLoginGuard true");
      return true;
    };
  }
}