import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.firebaseService.getAuthState().pipe(
      take(1),
      map((user) => {
        if (!user) {
          return true;
        }

        const redirectRoute = user.email?.endsWith('@alumno.cl')
          ? '/home'
          : '/homep';

        return this.router.createUrlTree([redirectRoute]);
      })
    );
  }
}
