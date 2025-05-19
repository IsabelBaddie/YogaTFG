import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToSobreNosotros() {
    this.router.navigate(['/sobrenosotros']);
  }

  goToPrivacidad() {
    this.router.navigate(['/privacidad']);
  }

  goToRutina(tipo: string) {
    if (tipo === 'guiadas') {
      this.router.navigate(['/guiadas']);
    } else if (tipo === 'personalizadas') {
      this.router.navigate(['/personalizadas']);
    }
  }

 comienzaRutinaPersonalizada(rutina_id: string) {
this.router.navigate(['/verpersonalizada', rutina_id]);
}


  comienzaRutinaGuiada(rutina_id: string) {
    this.router.navigate(['/verguiada', rutina_id]);
    
  } 
}
