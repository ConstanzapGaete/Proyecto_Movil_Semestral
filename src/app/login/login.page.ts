import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioAppService } from 'src/app/servicio-app.service';

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
    public navctr: NavController,
    private servicioAppService: ServicioAppService
  ) {
    this.formulario = this.f.group({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (!this.formulario.valid) {
      await this.mostrarAlerta(
        'Campos Vacíos',
        'Por favor, llena todos los campos.'
      );
      return;
    }

    const formulariologin = this.formulario.value;

    if (this.servicioAppService.hayUsuariosRegistrados()) {
      if (
        this.servicioAppService.autenticarUsuario(
          formulariologin.usuario,
          formulariologin.password
        )
      ) {
        this.navctr.navigateRoot('home');
      } else {
        await this.mostrarAlerta(
          'Datos incorrectos',
          'Los datos que ingresaste son incorrectos. >:c'
        );
      }
    } else {
      await this.mostrarAlerta('Error', 'No hay usuarios registrados.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  // esto es para los enlaces del footer
  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }
}
