import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noingresadoGuard } from './Guards/noingresado.guard';
import { ingresadoGuard } from './Guards/ingresado.guard';
import { autenticado } from './Guards/autenticado.guard';
import { autenticadoa } from './Guards/autenticadoa.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [ingresadoGuard, autenticadoa],
  },
  {
    path: 'homep',
    loadChildren: () =>
      import('./pages/homep/homep.module').then((m) => m.HomepPageModule),
    canActivate: [autenticado],
  },
  {
    path: 'asignaturas',
    loadChildren: () =>
      import('./pages/asignaturas/asignaturas.module').then(
        (m) => m.AsignaturasPageModule
      ),
    canActivate: [autenticado],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    
    canActivate: [noingresadoGuard],
  },
  {
    path: 'pass',
    loadChildren: () =>
      import('./pages/pass/pass.module').then((m) => m.PassPageModule),
  },
  {
    path: 'e404',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
