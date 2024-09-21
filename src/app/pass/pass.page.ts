import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioAppService } from '../servicio-app.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {
  formulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private servicioApp: ServicioAppService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      nuevaPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async cambiarContrasena() {
    if (this.formulario.invalid) {
      await this.mostrarAlerta(
        'Campos incompletos',
        'Por favor, completa todos los campos requeridos.'
      );
      return;
    }

    const { usuario: usuarioIngresado, nuevaPassword } = this.formulario.value;

    const usuarioExiste =
      this.servicioApp.verificarUsuarioExistente(usuarioIngresado);

    if (!usuarioExiste) {
      await this.mostrarAlerta(
        'Usuario no encontrado',
        'El nombre de usuario que ingresaste no está registrado.'
      );
      return;
    }

    const exito = this.servicioApp.cambiarContrasena(
      usuarioIngresado,
      nuevaPassword
    );

    if (exito) {
      await this.mostrarAlerta(
        'Contraseña Cambiada',
        'Tu contraseña ha sido cambiada exitosamente.'
      );
      this.router.navigate(['/login']);
    } else {
      await this.mostrarAlerta('Error', 'No se pudo cambiar la contraseña.');
    }
  }

  private async mostrarAlerta(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
