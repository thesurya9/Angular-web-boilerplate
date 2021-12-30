import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  state: RouterStateSnapshot 
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if (localStorage.getItem('alertrak-auth-token')) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: {'redirectURL':state.url} });
    // this.router.navigate(['/login']);
    return false;
  }
}
