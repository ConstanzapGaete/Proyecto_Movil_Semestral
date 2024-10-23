import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../Services/firebase.service';
import { endWith, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class noingresadoGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.firebaseService.getAuthState().pipe(
      take(1),
      map((user) => {
        if (user) {
          if (user.email?.endsWith('@alumno.cl')) {
            this.router.navigate(['/home']);
            return false;
          } else {
            this.router.navigate(['/homep']);
            return false;
          }
        } else {
          return true;
        }
      })
    );
  }
}
