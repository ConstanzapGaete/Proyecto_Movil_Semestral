import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserType } from 'src/app/Models/tipos.users';
import { AuthGuard } from './Guards/auth-guard.guard';
import { LoginGuard } from './Guards/login-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { userType: UserType.ALUMNO },
  },
  {
    path: 'justificara',
    loadChildren: () =>
      import('./pages/justificara/justificara.module').then(
        (m) => m.JustificaraPageModule
      ),
    canActivate: [AuthGuard],
    data: { userType: UserType.ALUMNO },
  },

  {
    path: 'homep',
    loadChildren: () =>
      import('./pages/homep/homep.module').then((m) => m.HomepPageModule),
    canActivate: [AuthGuard],
    data: { userType: UserType.PROFESOR },
  },
  {
    path: 'asignaturas',
    loadChildren: () =>
      import('./pages/asignaturas/asignaturas.module').then(
        (m) => m.AsignaturasPageModule
      ),
    canActivate: [AuthGuard],
    data: { userType: UserType.PROFESOR },
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
    canActivate: [LoginGuard],
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
