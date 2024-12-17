import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Subscription } from 'rxjs';
import {
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from 'src/app/Services/geolocalizacion.service';
import { ScanService } from 'src/app/Services/scan.service';
import { BasededatosService } from 'src/app/Services/basededatos.service';
import { AsistenciaAsignatura } from 'src/app/Models/asistencia-asignatura';
import { collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  estado: string = 'Presente';
  correo: string = '';
  asingatura: string = '';
  id: string = '';
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
  isScannerActive: boolean = false;
  private scan = inject(ScanService);
  asistencias: AsistenciaAsignatura[];
  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private ubi: GeocodingService,
    private basedeatosService: BasededatosService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe((user) => {
        this.nombreUsuario = user ? this.extraerNombre(user.email) : 'Invitado';
        this.correo = user.email;
      });
    await this.ObtenerUbicacion();
    this.obtenerFecha();
    await this.obtenerClases();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'first');
  }

  ngOnDestroy() {
    this.menuCtrl.close();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.isScannerActive = false;
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
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
                message:
                  'Error inesperado al cerrar sesión. Inténtalo nuevamente.',
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
  async justificarAsistencia() {
    await this.menuCtrl.close();
    this.navCtrl.navigateForward('/justificara', {});
  }
  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/home', {});
  }
  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
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

  async obtenerClases() {
    const asignaturas = [
      'Arquitectura de software',
      'Programación de aplicaciones móviles',
      'Calidad de Software',
    ];
    const asistenciasData: AsistenciaAsignatura[] = [];

    try {
      for (const asignatura of asignaturas) {
        // Obtener todas las clases de la asignatura
        const asignaturaRef = collection(this.basedeatosService.db, asignatura);
        const querySnapshot = await getDocs(asignaturaRef);

        let totalClases = 0;
        let asistencias = 0;

        querySnapshot.forEach((doc) => {
          const claseData = doc.data();
          totalClases++;

          // Buscar al estudiante actual en la lista de estudiantes
          const estudiante = claseData['estudiantes']?.find(
            (est: any) => est.correo === this.correo
          );

          if (estudiante && estudiante.estado === 'Presente') {
            asistencias++;
          }
        });

        // Calcular el porcentaje
        const porcentaje =
          totalClases > 0 ? (asistencias / totalClases) * 100 : 0;

        asistenciasData.push({
          asignatura,
          porcentaje: Math.round(porcentaje * 10) / 10, // Redondear a 1 decimal
          totalClases,
          asistencias,
        });
      }

      // Actualizar el template con los datos
      this.asistencias = asistenciasData;
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
      await this.presentAlert(
        'Error',
        'No se pudieron cargar los datos de asistencia.'
      );
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

  async Scan() {
    const loading = await this.loadingController.create({
      message: 'Escaneando y registrando asistencia...',
      spinner: 'circles',
    });

    try {
      await loading.present();

      const data = await this.scan.Scannear();
      const datos = JSON.parse(data);

      this.id = datos.id;
      this.asingatura = datos.Asignatura;

      console.log('Datos escaneados:', datos);

      const fechasPresente =
        await this.basedeatosService.fechasclasesestudiante(
          this.asingatura,
          this.correo
        );

      if (fechasPresente.includes(datos.fecha)) {
        await loading.dismiss();
        await this.presentAlert(
          'Asistencia ya registrada',
          'Ya has registrado tu asistencia para esta clase.'
        );
        return;
      }

      await this.basedeatosService.registrarAsistencia(
        this.asingatura,
        this.id,
        this.correo,
        this.nombreUsuario,
        this.ubicacion,
        this.horas,
        this.estado
      );

      await this.presentAlert('Éxito', 'Se registró la asistencia con éxito.');
    } catch (error) {
      console.error('Error al escanear:', error);
      await this.presentAlert(
        'Error',
        'Hubo un problema al registrar la asistencia.'
      );
    } finally {
      await loading.dismiss();
    }
  }
}
