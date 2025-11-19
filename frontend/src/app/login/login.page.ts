// Página de Login
// Aquí el usuario "erico" introduce su nombre y contraseña,
// se llama al backend y se guarda el token si el login es correcto.

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false   // igual que el resto de páginas
})
export class LoginPage {

  // Campos del formulario de login
  nombre: string = '';
  password: string = '';

  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Método que se ejecuta al pulsar el botón "Entrar"
  entrar() {
    // Llamo al backend con los datos del formulario
    this.authService.login({
      nombre: this.nombre,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // Si el login es correcto, guardo el token y navego a Home
        console.log('Token recibido desde backend:', res.token);
        this.authService.guardarToken(res.token);

        // Redirijo a Home
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Error en login:', err);
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
