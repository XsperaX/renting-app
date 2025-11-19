// Servicio de autenticación
// Se encarga de hacer login contra el backend y guardar el token

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base de mi backend Node
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Hago la petición POST /auth/login con nombre y password puse erico y pirineus
  login(datos: { nombre: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', datos);
  }

  // Guardo el token en localStorage
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Devuelvo el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Elimino el token como se dijo en clase,por si cierro sesion.
  logout() {
    localStorage.removeItem('token');
  }
}
