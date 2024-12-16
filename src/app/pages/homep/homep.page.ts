import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NavController,
  MenuController,
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Subscription } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from 'src/app/Services/geolocalizacion.service';


@Component({
  selector: 'app-homep',
  templateUrl: './homep.page.html',
  styleUrls: ['./homep.page.scss'],
})
export class HomepPage implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  nombreUsuario: string = 'Usuario';
  latitud: number | null = null;
  longitud: number | null = null;
  dia: string = '';
  fechaa: string = '';
  horas: string = '';
  ubicacion: string = '';

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController,
    private ubi: GeocodingService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private AlertController: AlertController,
  ) {}

  async ngOnInit() {
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe((user) => {
        this.nombreUsuario = user ? this.extraerNombre(user.email) : 'Invitado';
      });
    await this.ObtenerUbicacion();
    this.obtenerFecha();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async cerrarSesion() {
    const alert = await this.AlertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          },
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cerrando sesión...',
              spinner: 'crescent',
            });
            await loading.present();
  
            try {
              this.firebaseService.signOut().subscribe({
                next: async () => {
                  console.log('Sesión cerrada exitosamente');
                  await loading.dismiss();
  
                  const toast = await this.toastController.create({
                    message: 'Sesión cerrada exitosamente',
                    duration: 2000,
                    position: 'bottom',
                    color: 'success',
                  });
                  await toast.present();
  
                  this.navCtrl.navigateRoot('/login', {
                    animated: true,
                    animationDirection: 'forward',
                  });
                },
                error: async (error) => {
                  console.error('Error al cerrar sesión:', error);
                  await loading.dismiss();
  
                  const toast = await this.toastController.create({
                    message: 'Error al cerrar sesión. Inténtalo de nuevo.',
                    duration: 2000,
                    position: 'bottom',
                    color: 'danger',
                  });
                  await toast.present();
                },
              });
            } catch (error) {
              console.error('Error general:', error);
              await loading.dismiss();
  
              const toast = await this.toastController.create({
                message: 'Error inesperado al cerrar sesión. Inténtalo nuevamente.',
                duration: 2000,
                position: 'bottom',
                color: 'danger',
              });
              await toast.present();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async asignaturas() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/asignaturas', {});
  }

  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/homep', {});
  }

  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }

  extraerNombre(email: string): string {
    const nombre = email.split('@')[0];
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  async ObtenerUbicacion() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;
      this.ubicacion = await this.ubi.getLocation(this.latitud, this.longitud);
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    }
  }

  obtenerFecha() {
    const fecha = new Date();

    const opcionesFecha: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const opcionesDia: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    this.fechaa = fecha.toLocaleDateString('es-ES', opcionesFecha);
    this.dia = fecha.toLocaleDateString('es-ES', opcionesDia);
    this.horas = fecha.toLocaleTimeString('es-ES', opcionesHora);
  }
}
