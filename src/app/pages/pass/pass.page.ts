import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { FirebaseService } from '../../Services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {
  formulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private firebaseService: FirebaseService,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formulario = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }

  async cambiarContrasena() {
    const email = this.formulario.value['email'];

    if (this.formulario.valid) {
      this.firebaseService.resetPassword(email).subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Correo enviado',
            message:
              'Se ha enviado un correo electrónico para restablecer su contraseña.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/login']);
        },
        error: async (err) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message:
              'Este correo electrónico no está registrado o hubo un problema al enviar el correo.',
            buttons: ['OK'],
          });
          await alert.present();
          console.log(err);
        },
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, completa todos los campos antes de continuar.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }
}
