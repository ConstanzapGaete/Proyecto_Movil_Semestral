import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  formulario: FormGroup;

  constructor(public f: FormBuilder, public alertController: AlertController,private router: Router) {
    this.formulario = this.f.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }

  async restablecer() {
    var f = this.formulario.value;

    if (this.formulario.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }


 
    var user = {
      usuario: f.usuario,  
      password: f.password
    };


    localStorage.setItem('usuario', JSON.stringify(user));

    const alert = await this.alertController.create({
      header: 'Usuario creado',
      message: 'El usuario se ha creado correctamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login']); 
          }
        }
      ]
    });

    await alert.present();
  }
}
