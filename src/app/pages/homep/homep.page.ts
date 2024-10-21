import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homep',
  templateUrl: './homep.page.html',
  styleUrls: ['./homep.page.scss'],
})
export class HomepPage implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  mostrarCodigoQR = false;
  nombreUsuario: string = 'Usuario';

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.enableMenu();
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe((user) => {
        if (user) {
          this.nombreUsuario = user.email || 'Usuario';
          console.log('Usuario autenticado:', this.nombreUsuario);
        } else {
          this.nombreUsuario = 'Invitado';
          console.log('No hay usuario autenticado');
        }
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  enableMenu() {
    this.menuCtrl.enable(true);
  }

  async cerrarSesion() {
    await this.menuCtrl.close();
    this.firebaseService.signOut().subscribe({
      next: () => {
        this.navCtrl.navigateRoot('/login', {
          animated: true,
          animationDirection: 'forward',
        });
      },
    });
  }

  async asignaturas() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/asignaturas', {});
  }

  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/homep', {});
  }

  async mostrarqr() {
    this.mostrarCodigoQR = true;
    setTimeout(() => {
      this.mostrarCodigoQR = false;
    }, 5000);
  }

  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }
}
