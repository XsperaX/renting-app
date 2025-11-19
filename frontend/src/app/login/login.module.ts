// Módulo de la página de Login
// Importa Ionic, Forms y el routing del propio login

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule   // <-- routing propio de esta página
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
