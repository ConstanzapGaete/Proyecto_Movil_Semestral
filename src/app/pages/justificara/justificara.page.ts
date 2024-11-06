import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-justificara',
  templateUrl: './justificara.page.html',
  styleUrls: ['./justificara.page.scss'],
})
export class JustificaraPage implements OnInit {
  mensaje: string = '';

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async cerrarSesion() {
    try {
      await this.menuCtrl.close();
      this.firebaseService.signOut().subscribe({
        next: () => {
          console.log('Sesión cerrada exitosamente');
          this.navCtrl.navigateRoot('/login', {
            animated: true,
            animationDirection: 'forward',
          });
        },
      });
    } catch (error) {
      console.error('Error al cerrar el menú:', error);
    }
  }
  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  fechaSeleccionada(event: any) {
    const fecha = event.detail.value;
    console.log("Fecha seleccionada:", fecha);
    
  }
  

}
