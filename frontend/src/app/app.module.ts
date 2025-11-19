import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Módulo necesario para poder usar HttpClient y hacer peticiones al backend
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent // Componente raíz de la app
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule   // <--- IMPORTANTE para que funcionen las peticiones HTTP
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true}
 ],
  bootstrap: [AppComponent]
})
export class AppModule {}
