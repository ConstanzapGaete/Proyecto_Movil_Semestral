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

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const isAuthenticated = await this.servicioAppService.obtenerUsuarioAutenticado(); 
    if (isAuthenticated) {
      this.navCtrl.navigateRoot('home');
      return false;
    } else {
      return true;
    }
  }
}
