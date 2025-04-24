import { Component } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
  IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption, 
  IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView
} from '@ionic/angular/standalone';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
    IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton, IonLabel,  IonSegmentContent, IonSegmentView
  ],
})
export class HomePage {

    constructor(private navigationService: NavigationService) {}

    goToHome() {
      this.navigationService.goToHome();
    }
    
    goToSobreNosotros() {
      this.navigationService.goToSobreNosotros();
    }

    goToPrivacidad() {
      this.navigationService.goToPrivacidad();
    }
    
    onRutinaChange(event: any) {
      this.navigationService.goToRutina(event.detail.value);
    }

  login() {
    console.log('Login clicked');
  }

  logout() {
    console.log('Logout clicked');
  }
}
