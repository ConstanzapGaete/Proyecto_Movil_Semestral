import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { User } from 'src/app/Models/user.models';

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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  firebaseSvc = inject(FirebaseService);
  ngOnInit() {}

  async ingresar() {
    if (this.formulario.valid) {
      this.firebaseSvc.signIn(this.formulario.value as User).subscribe({
        next: (result) => {
          const email = result.user.email;

          if (email?.endsWith('@profesor.cl')) {
            this.router.navigate(['homep']);
            console.log('profe');
          } else if (email?.endsWith('@alumno.cl')) {
            this.router.navigate(['home']);
            console.log('alumno');
          } else {
            this.router.navigate(['home']);
          }
        },
        error: async (err) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Credenciales incorrectas o problema con el servidor.',
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

  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }
}
