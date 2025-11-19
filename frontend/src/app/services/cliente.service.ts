import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = "http://localhost:8080/clientes";

  constructor(private http: HttpClient) {}

  // GET – obtener todos los clientes
  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST – crear cliente
  crearCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  // PUT – actualizar cliente
  actualizarCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  // DELETE – eliminar cliente
  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
