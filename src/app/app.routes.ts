import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
];
