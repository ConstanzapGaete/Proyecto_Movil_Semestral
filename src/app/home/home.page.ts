import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // Recuperar el nombre del usuario de localStorage
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.nombreUsuario = user.usuario; // Asignar el nombre del usuario
    }
  }

  cerrarSesion() {
    
    localStorage.removeItem('ingresado'); 
    this.navCtrl.navigateRoot('/login'); 
  }
}
