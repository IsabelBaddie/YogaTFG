import { Routes } from '@angular/router';

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
  },
  {
    path: 'sobrenosotros',
    loadComponent: () => import('./pages/sobrenosotros/sobrenosotros.page').then( m => m.SobrenosotrosPage)
  },
  {
    path: 'guiadas',
    loadComponent: () => import('./guiadas/guiadas.page').then( m => m.GuiadasPage)
  },
  {
    path: 'personalizadas',
    loadComponent: () => import('./pages/personalizadas/personalizadas.page').then( m => m.PersonalizadasPage)
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/privacidad/privacidad.page').then( m => m.PrivacidadPage)
  },
  {
    path: 'gestionrutina',
    loadComponent: () => import('./pages/gestionrutina/gestionrutina.page').then( m => m.GestionrutinaPage)
  },
];
