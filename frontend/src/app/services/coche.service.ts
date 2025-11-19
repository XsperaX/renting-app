import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  // URL del backend (mi API REST en Node + Express)
  private apiUrl = 'http://localhost:8080/coches';

  constructor(private http: HttpClient) {}

  /// GET para obtener los coches
  getCoches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  /// POST para crear un coche nuevo
  crearCoche(coche: any): Observable<any> {
    return this.http.post(this.apiUrl, coche);
  }

  /// PUT para actualizar los coches
  actualizarCoche(id: number, coche: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, coche);
  }

  /// DELETE para eliminar coche
  eliminarCoche(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  // SUBIR FOTO DEL COCHE  (POST /coches/foto/:id)
  subirFoto(id: number, archivo: File): Observable<any> {

    const formData = new FormData(); 
    formData.append("foto", archivo);

    return this.http.post(`${this.apiUrl}/foto/${id}`, formData);
  }

}
