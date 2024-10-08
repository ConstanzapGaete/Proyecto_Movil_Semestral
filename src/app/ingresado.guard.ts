import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ServicioAppService } from 'src/app/servicio-app.service'; 

@Injectable({
  providedIn: 'root'
})
export class ingresadoGuard implements CanActivate {

  constructor(public navCtrl: NavController, private servicioAppService: ServicioAppService) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   
    if (this.servicioAppService.obtenerUsuarioAutenticado()) {
      return true;
    } else {
      this.navCtrl.navigateRoot('login');        
      return false;
    }
  }
}
