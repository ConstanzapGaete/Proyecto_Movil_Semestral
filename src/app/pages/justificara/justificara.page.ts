import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { BasededatosService } from 'src/app/Services/basededatos.service';

@Component({
  selector: 'app-justificara',
  templateUrl: './justificara.page.html',
  styleUrls: ['./justificara.page.scss'],
})
export class JustificaraPage implements OnInit, OnDestroy {
  mensaje: string = '';
  private authSubscription: Subscription;
  ausencias: { fecha: string; asignatura: string }[] = [];
  documentoSubido: boolean = false; 

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private basededatosService: BasededatosService,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  ngOnDestroy() {
    this.menuCtrl.close();
    this.authSubscription = this.firebaseService
      .getAuthState()
      .subscribe(async (user) => {
        if (user?.email) {
          this.ausencias = await this.basededatosService.obtenerFechasAusentes(
            user.email
          );
        }
      });
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

  async subirDocumento() {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,.pdf';
      fileInput.onchange = async () => {
        const file = fileInput.files![0];
        const reader = new FileReader();

        reader.onload = async () => {
          const base64Data = reader.result as string;

          const extension = file.type.includes('image') ? 'jpeg' : 'pdf';
          const fileName = `documento_${Date.now()}.${extension}`;
          await Filesystem.writeFile({
            path: fileName,
            data: base64Data.split(',')[1],
            directory: Directory.Documents,
          });

          console.log(`${fileName} guardado `);
          this.documentoSubido = true;
        };
        reader.readAsDataURL(file);
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
      console.log('Formulario enviado ');
      
    }
  }


  async abrirEnlace(url: string) {
    await this.menuCtrl.close();
    window.open(url, '_blank');
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async home() {
    await this.menuCtrl.close();
    this.navCtrl.navigateRoot('/homep', {});
  }
  
}
