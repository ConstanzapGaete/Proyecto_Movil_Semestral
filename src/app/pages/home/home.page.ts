import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from 'src/app/Services/geolocalizacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  nombreUsuario: string = 'Invitado';
  private authSubscription: Subscription;
  isSupported = false;
  result: string = '';
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
    private alertController: AlertController,
    private ubi: GeocodingService
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

  async scan(): Promise<void> {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      });

      if (result && result.ScanResult) {
        this.result = result.ScanResult;
        this.presentAlert('Código escaneado', result.ScanResult);
        console.log('Código escaneado:', this.result);
      } else {
        this.presentAlert('Error', 'No se pudo escanear el código.');
      }
    } catch (error) {
      console.error('Error al escanear el código:', error);
      this.presentAlert('Error', 'Ocurrió un error al intentar escanear.');
    }
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
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
      console.log('Latitud:', this.latitud, 'Longitud:', this.longitud);
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
