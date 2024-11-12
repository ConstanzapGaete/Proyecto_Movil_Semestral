import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { BasededatosService } from 'src/app/Services/basededatos.service';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from 'src/app/Services/geolocalizacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit, OnDestroy {
  iddocumento: string = '';
  nombreUsuario: string = 'Invitado';
  private authSubscription: Subscription;
  MostrarqrId: string | null = null;
  latitud: number | null = null;
  longitud: number | null = null;
  dia: string = '';
  fechaa: string = '';
  horas: string = '';
  ubicacion: string = '';
  asignatura: string = '';
  siglaasignatura: string = '';
  qrvalor: string = '';

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController,
    private basededatosService: BasededatosService,
    private ubi: GeocodingService
  ) {}

  async ngOnInit() {
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe((user) => {
        if (user) {
          this.nombreUsuario = user.email || 'Usuario';
        } else {
          this.nombreUsuario = 'Invitado';
        }
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

  async asignaturas() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/asignaturas', {});
  }

  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/homep', {});
  }

  async abrirEnlace(url: string) {
    window.open(url, '_blank');
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

  async mostrarqr(idCard: string, codigo: string) {
    this.asignatura = idCard;
    this.siglaasignatura = codigo;
    console.log(this.asignatura, ' ', this.siglaasignatura);
    this.MostrarqrId = idCard;
    const id = await this.basededatosService.registrarClase(
      this.asignatura,
      this.siglaasignatura,
      this.dia,
      this.fechaa,
      this.horas,
      this.nombreUsuario,
      this.ubicacion
    );
    const Jsoninfo = {
      id: id,
      Asignatura: this.asignatura,
      codigo: this.siglaasignatura,
      fecha: this.fechaa,
      dia: this.dia,
      hora: this.horas,
      ubicacion: this.ubicacion,
      profesor: this.nombreUsuario,
    };
    const qrinfo = JSON.stringify(Jsoninfo);
    console.log('QR info:', Jsoninfo);

    this.qrvalor = qrinfo;
    setTimeout(() => {
      if (this.MostrarqrId === idCard) {
        this.MostrarqrId = null;
      }
    }, 100000);
  }
}
