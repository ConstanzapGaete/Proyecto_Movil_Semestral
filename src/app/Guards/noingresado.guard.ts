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
import { map, take } from 'rxjs/operators';

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
          console.log('no ingresado')
          return this.router.createUrlTree(['/home']);
        } else {
          return true;
        }
      })
    );
  }
}
