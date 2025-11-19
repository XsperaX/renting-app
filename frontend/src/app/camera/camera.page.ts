import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false
})
export class CameraPage {

  // Aquí guardo la foto tomada
  foto: string | null = null;

  constructor() {}

  // Método que llama a la cámara del móvil
  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 85,
      resultType: CameraResultType.DataUrl
    });

    this.foto = imagen.dataUrl || null;
  }

}
