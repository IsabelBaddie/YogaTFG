import { Injectable } from '@angular/core';
import {  Route, UrlSegment, Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private navigationService: NavigationService) {}

  async canActivate(): Promise<boolean> { //Método que se debe implementar para el guard 
    const usuario = await this.storageService.get('usuarioActivo'); //Obtenemos el usuario activo del almacenamiento local
    if (usuario) { //Si en el storage tenemos un usuario activo significa que está autenticado
      return true;
    } else {
      this.navigationService.goToLogin(); //Llevamos al usuario a la página de inicio de sesión si no está autenticado
      return false;
    }
  }
}
