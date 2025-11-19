import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private apiUrl = "http://localhost:8080/alquilers";

  constructor(private http: HttpClient) {}

  // GET - obtener todos los alquileres
  getAlquileres(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST - crear alquiler
  crearAlquiler(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // PUT - actualizar alquiler
  actualizarAlquiler(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // DELETE - eliminar alquiler
  eliminarAlquiler(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
