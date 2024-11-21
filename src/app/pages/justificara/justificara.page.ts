import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-justificara',
  templateUrl: './justificara.page.html',
  styleUrls: ['./justificara.page.scss'],
})
export class JustificaraPage implements OnInit, OnDestroy {
  mensaje: string = '';
  private authSubscription: Subscription;
  documentoSubido: boolean = false; 

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ngOnDestroy() {
    this.menuCtrl.close();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.mostrarAlerta();
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Recuerda',
      message: '¡Recuerda que solo debes justificar tus inasistencias a evaluaciones!',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  async subirDocumento() {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,.pdf';
      fileInput.onchange = async () => {
        const file = fileInput.files![0];
        if (file) {
          this.documentoSubido = true; 
          console.log(`Documento seleccionado: ${file.name}`);
        }
      };

      fileInput.click();
    } catch (error) {
      console.error('Error al subir el documento:', error);
    }
  }

  async enviar() {
    if (!this.mensaje && !this.documentoSubido) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Debes enviar al menos un documento o escribir un mensaje.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Justificación enviada',
        message: 'Dirección te enviará un email cuando el proceso esté finalizado.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.home(); 
            },
          },
        ],
      });

      await alert.present();

      console.log('Formulario enviado');
    }
  }

  async cerrarSesion() {
    this.navCtrl.navigateRoot('/authen');
  }

  async home() {
    this.navCtrl.navigateRoot('/home');
  }
}
