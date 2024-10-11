import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ServicioAppService } from 'src/app/Services/servicio-app.service'; 

@Injectable({
  providedIn: 'root'
})
export class noingresadoGuard implements CanActivate {

  constructor(public navCtrl: NavController, private servicioAppService: ServicioAppService) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   
    if (this.servicioAppService.obtenerUsuarioAutenticado()) {
      this.navCtrl.navigateRoot('home');
      return false;
    } else {
      return true;
    }
  }
}
