import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
    
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(localStorage.getItem('ngFuseToken')) {
        //console.log('I am logged in checking from authgard');
        return true;
    } else {
        //console.log('I am not logged in checking from authgard');
        this.router.navigate(['/sessions/signin']);
        return false;    
    }  
  }
}