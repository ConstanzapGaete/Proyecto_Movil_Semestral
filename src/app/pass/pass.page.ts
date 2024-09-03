import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  formulario: FormGroup;

  constructor(
    public f: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    public navCtrl: NavController
  ) {
    this.formulario = this.f.group({
      'usuario': new FormControl('', [Validators.required]),
      'nuevaPassword': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { }

  async cambiarContrasena() {
    if (this.formulario.invalid) {  
      await this.mostrarAlerta('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
      return;
    }

    const usuarioIngresado = this.formulario.value.usuario;
    const nuevaPassword = this.formulario.value.nuevaPassword;
    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.usuario.toLowerCase() === usuarioIngresado.toLowerCase()) {
        
        user.password = nuevaPassword;
        localStorage.setItem('usuario', JSON.stringify(user));  

        console.log('Contraseña cambiada:', nuevaPassword);
        
        // Mostrar la alerta de éxito
        await this.mostrarAlerta('Contraseña Cambiada', 'Tu contraseña ha sido cambiada exitosamente.');
        this.router.navigate(['/login']);  // Redirigir al login

      } else {
        await this.mostrarAlerta('Usuario no encontrado', 'El nombre de usuario que ingresaste no está registrado.');
      }
    } else {
      await this.mostrarAlerta('Error', 'No hay usuarios registrados.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
