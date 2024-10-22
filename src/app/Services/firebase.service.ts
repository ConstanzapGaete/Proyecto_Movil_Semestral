import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../Models/user.models';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  private authState = new BehaviorSubject<any>(null);

  signIn(user: User): Observable<any> {
    return from(
      signInWithEmailAndPassword(getAuth(), user.email, user.password)
    );
  }
  constructor() {
    this.auth.authState.subscribe((user) => {
      this.authState.next(user);
    });
  }
  signUp(user: User): Observable<any> {
    return from(
      createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    );
  }

  signOut(): Observable<void> {
    console.log('cerrando');
    return from(this.auth.signOut()).pipe(
      tap(() => {
        console.log('Firebase: Sesión cerrada con éxito');
        this.authState.next(null);
      }),
      catchError((error) => {
        console.error('Firebase: Error al cerrar sesión', error);
        return throwError(() => new Error('No se pudo cerrar la sesión'));
      })
    );
  }

  getAuthState(): Observable<any> {
    console.log()
    return this.authState.asObservable();
  }

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(getAuth(), email));
  }

  getCurrentUser(): Observable<any> {
    return this.auth.authState;
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }
}
