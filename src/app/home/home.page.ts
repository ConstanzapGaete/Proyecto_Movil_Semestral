import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioAppService } from '../servicio-app.service';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private navCtrl: NavController,
    private servicioAppService: ServicioAppService  
  ) {}

  ngOnInit() {
    const usuarioAutenticado = this.servicioAppService.obtenerUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.nombreUsuario = this.NombreMayus(usuarioAutenticado.usuario); 
    } else {
      this.nombreUsuario = 'Invitado'; 
    }
    console.log('Usuarios registrados:', this.servicioAppService.obtenerUsuarios());    
  }

  cerrarSesion() {
    this.servicioAppService.cerrarSesion();
    this.navCtrl.navigateRoot('/login');  
  }

  NombreMayus(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }
}
