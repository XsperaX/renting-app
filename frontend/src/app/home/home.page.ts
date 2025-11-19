import { Component } from '@angular/core';
import { Router } from '@angular/router';

// IMPORTO LA CÁMARA DE CAPACITOR
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// IMPORTO SERVICIO DE AUTENTICACIÓN PARA CERRAR SESIÓN
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false   // IMPORTANTE: así encaja con el módulo clásico
})
export class HomePage {

  // Aquí guardo la foto capturada para mostrarla en la pantalla
  foto: string | null | undefined = null;

  constructor(
    private router: Router,
    private auth: AuthService   // servicio para logout
  ) {}

  // Método para navegar a otras páginas (coches, clientes, alquileres...)
  go(path: string) {
    this.router.navigate([path]);
  }

  // MÉTODO PARA TOMAR UNA FOTO CON LA CÁMARA DEL MÓVIL
  async tomarFoto() {

    // Uso el plugin Camera para abrir la cámara nativa
    const imagen = await Camera.getPhoto({
      quality: 90,               // calidad de la foto
      allowEditing: false,       // no permito recortar
      resultType: CameraResultType.DataUrl,   // recibo la imagen como base64
      source: CameraSource.Camera              // abrir directamente la cámara
    });

    // Guardo la imagen para mostrar en el HTML
    this.foto = imagen.dataUrl;
  }

  // MÉTODO PARA CERRAR SESIÓN (borra token y vuelve al login)
  logout() {
    this.auth.logout();                // elimino token del localStorage
    this.router.navigate(['/login']);  // vuelvo a login
  }

}
