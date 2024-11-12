import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-justificara',
  templateUrl: './justificara.page.html',
  styleUrls: ['./justificara.page.scss'],
})
export class JustificaraPage implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  nombreUsuario: string = 'Invitado';

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe((user) => {
        if (user) {
          this.nombreUsuario = user.email || 'Usuario';
        } else {
          this.nombreUsuario = 'Invitado';
        }
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async cerrarSesion() {
    try {
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

  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/home', {});
  }

  async justificarAsistencia() {
    await this.menuCtrl.close();
    this.navCtrl.navigateForward('/justificara', {});
  }

  async abrirEnlace(url: string) {
    window.open(url, '_blank');
  }
}
