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
      this.nombreUsuario = usuarioAutenticado.usuario; 
    } else {
      this.nombreUsuario = 'Invitado'; 
    }
    console.log('Usuarios registrados:', this.servicioAppService.obtenerUsuarios());    
  }

  cerrarSesion() {
    this.servicioAppService.cerrarSesion();
    this.navCtrl.navigateRoot('/login');  
  }
}
