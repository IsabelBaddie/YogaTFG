import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
    {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'sobrenosotros',
    loadComponent: () => import('./pages/sobrenosotros/sobrenosotros.page').then( m => m.SobrenosotrosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'guiadas',
    loadComponent: () => import('./pages/guiadas/guiadas.page').then( m => m.GuiadasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'personalizadas',
    loadComponent: () => import('./pages/personalizadas/personalizadas.page').then( m => m.PersonalizadasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/privacidad/privacidad.page').then( m => m.PrivacidadPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'verguiada/:id',
    loadComponent: () => import('./pages/verguiada/verguiada.page').then( m => m.VerguiadaPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'verpersonalizada/:id',
    loadComponent: () => import('./pages/verpersonalizada/verpersonalizada.page').then( m => m.VerpersonalizadaPage),
    canActivate: [AuthGuard]
  },
];
