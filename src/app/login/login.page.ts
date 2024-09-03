import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

  constructor(
    public f: FormBuilder,
    public alertController: AlertController,
    private router: Router, 
    public navctr: NavController
  ) { 
    this.formulario = this.f.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (!this.formulario.valid) {  // Validar si el formulario está completo
      await this.mostrarAlerta('Campos Vacíos', 'Por favor, llena todos los campos.');
      return;  // Detener ejecución si el formulario no es válido
    }

    const formulariologin = this.formulario.value;
    const storedUser = localStorage.getItem('usuario');
  
    if (storedUser) {
      console.log('Stored User:', storedUser);
      const user = JSON.parse(storedUser);
  
      console.log('Stored User Object:', user);
      
      if (user.usuario.trim().toLowerCase() === formulariologin.usuario.trim().toLowerCase() &&
          user.password === formulariologin.password) {
        localStorage.setItem('ingresado', 'true');
        this.navctr.navigateRoot('home');
      } else {
        console.log('Datos incorrectos, mostrando alerta.');
        await this.mostrarAlerta('Datos incorrectos', 'Los datos que ingresaste son incorrectos. >:c');
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
