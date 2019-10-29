import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return new Promise(
     (resolve, reject) => {
       firebase.auth().onAuthStateChanged(
         (user) => {
           if (user) {
             resolve(true);
           } else {
             this.router.navigate(['/auth', 'signin']);
             resolve(false);
           }
         }
       );
     }
   );
  }
}



// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
