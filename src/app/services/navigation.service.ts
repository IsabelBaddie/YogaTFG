import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importamos Router (servicio de Angular) para la navegación entre rutas

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // Constructor de la clase que inyecta el servicio Router
  constructor(private router: Router) { }

  /* .navigate es un método del Router que permite navegar a una ruta específica 
  Internamente cambia la vista sin recargar la página (SPA: Single Page Application).
  */
  goToLogin() {
    this.router.navigate(['/login']);
  }


  goToHome() {
    this.router.navigate(['/home']);
  }

  goToSobreNosotros() {
    this.router.navigate(['/sobrenosotros']);
  }

  goToPrivacidad() {
    this.router.navigate(['/privacidad']);
  }

  goToRutina(tipo: string) { //Dependiendo del tipo de rutina que se le pase, navega a una u otra página
    if (tipo === 'guiadas') {
      this.router.navigate(['/guiadas']);
    } else if (tipo === 'personalizadas') {
      this.router.navigate(['/personalizadas']);
    }
  }

  comienzaRutinaPersonalizada(rutina_id: string) { //pasando el rutina_id como parámetro en la URL
    this.router.navigate(['/verpersonalizada', rutina_id]);
  }

  comienzaRutinaGuiada(rutina_id: string) { //pasando el rutina_id como parámetro en la URL
    this.router.navigate(['/verguiada', rutina_id]);

  }
}
