// AuthGuard para proteger páginas del frontend
// Evita que un usuario sin token pueda entrar a coches, clientes, alquileres...

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {

    const token = this.auth.getToken();

    // Si NO hay token → NO dejo entrar y lo reenvio al login
    if (!token) {
      this.router.navigate(['/login']);  // redirijo al login
      return false;
    }

    return true; // tiene token → dejo pasar
  }
}