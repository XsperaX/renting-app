import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // para proteger

const routes: Routes = [

  // Página inicial: la cambie login al final,por logear antes,ya que la ut5 me volvio loco
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // home (PROTEGIDA)
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },

  // 👉 Login (libre)
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },

  // Coches (PROTEGIDA)
  {
    path: 'coches',
    loadChildren: () =>
      import('./coches/coches.module').then(m => m.CochesPageModule),
    canActivate: [AuthGuard]
  },

  // Clientes (PROTEGIDA)
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AuthGuard]
  },

  // Alquileres (PROTEGIDA)
  {
    path: 'alquileres',
    loadChildren: () =>
      import('./alquileres/alquileres.module').then(m => m.AlquileresPageModule),
    canActivate: [AuthGuard]
  },

  // Cámara (PROTEGIDA)
  {
    path: 'camera',
    loadChildren: () =>
      import('./camera/camera.module').then(m => m.CameraPageModule),
    canActivate: [AuthGuard]
  },

  // tabs (no lo uso, lo voy a dejar,al crear con el ejemplo del pdf puse tabs por error.)
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
