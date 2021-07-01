import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

   constructor(private router: Router, private authenticationService: AuthenticationService){

   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const user = this.authenticationService.userValue;
      if(user){
        //authorize so returns true
        return true;
      }
      //redirect to login page 
      this.router.navigate(['/login/login']);
    return false;
  }
  
}
