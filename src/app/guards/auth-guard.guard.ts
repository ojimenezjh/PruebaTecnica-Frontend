import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../shared/services';
import { Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.userAuthService.isloggedIn();
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || '/');

    if (isLoggedIn && isAuthForm) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    return isLoggedIn || isAuthForm;
  }
}
