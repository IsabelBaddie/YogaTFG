import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
  IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
    IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption
  ],
})
export class HomePage {

  //Inyectar Router
  constructor(private router: Router) {}


  goToHome() {
    this.router.navigate(['/home']);
  }

  goToSobreNosotros() {
    this.router.navigate(['/sobrenosotros']);
  }

  onRutinaChange(event: any) {
    const seleccion = event.detail.value;
    if (seleccion === 'guiadas') {
      this.router.navigate(['/guiadas']);
    } else if (seleccion === 'personalizadas') {
      this.router.navigate(['/personalizadas']);
    }
  }

  login() {
    console.log('Login clicked');
  }

  logout() {
    console.log('Logout clicked');
  }
}
