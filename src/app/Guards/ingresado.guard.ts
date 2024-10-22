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
export class ingresadoGuard implements CanActivate {
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
        console.log('estamos en el guard')
        if (user) {
          console.log('ingresado')
          return true;
        } else {
          console.log('nos fuimos  del guard')
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
