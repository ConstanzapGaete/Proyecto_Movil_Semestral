import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NotificacionesService } from './Services/notificaciones.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private notificacionService: NotificacionesService
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor') || this.platform.is('android')) {
        this.notificacionService.pushinit();
      } else {
        console.log(
          'Corriendo en la web. Las notificaciones push no están disponibles'
        );
      }
    });
  }
}
