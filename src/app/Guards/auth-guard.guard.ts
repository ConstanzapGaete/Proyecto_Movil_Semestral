// auth.guard.ts
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
import { map, take, tap } from 'rxjs/operators';
import { UserType } from 'src/app/Models/tipos.users';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly ROUTES = {
    [UserType.ALUMNO]: '/home',
    [UserType.PROFESOR]: '/homep',
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiredType = route.data['userType'] as UserType;

    return this.firebaseService.getAuthState().pipe(
      take(1),
      tap((user) => {
        console.log('Auth State User:', user);
        console.log('Required Type:', requiredType);
        if (user) {
          console.log('User email:', user.email);
        }
      }),
      map((user) => {
        if (!user) {
          console.log('Usuario no encontrado, redirigiendo al login');
          return this.router.createUrlTree(['/login']);
        }

        const userType = this.getUserType(user.email);
        console.log('Determinando tipo de usuario:', userType);

        if (requiredType && requiredType !== userType) {
          console.log(
            'Usuario sin coincidencias, redireccionando:',
            this.ROUTES[userType]
          );
          return this.router.createUrlTree([this.ROUTES[userType]]);
        }

        console.log('Acceso correcto');
        return true;
      })
    );
  }

  private getUserType(email: string = ''): UserType {
    if (email.endsWith('@profesor.cl')) {
      return UserType.PROFESOR;
    }
    if (email.endsWith('@alumno.cl')) {
      return UserType.ALUMNO;
    }
    console.log('Dominio del email no reconocido:', email);
    return UserType.ALUMNO;
  }
}
