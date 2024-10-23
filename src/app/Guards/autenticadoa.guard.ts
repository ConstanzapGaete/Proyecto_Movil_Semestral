import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../Services/firebase.service';
import { Observable, of } from 'rxjs';
import { map, take, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class autenticadoa implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return of(null).pipe(
      delay(300),
      switchMap(() =>
        this.firebaseService.getAuthState().pipe(
          take(1),
          map((user) => {
            if (user && user.email?.endsWith('@alumno.cl')) {
              console.log('autenticado a');
              console.log(user);
              return true;
            } else {
              console.log('redirectToLogin a');
              this.router.navigate(['/login']);
              return false;
            }
          })
        )
      )
    );
  }
}
