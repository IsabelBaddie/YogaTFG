import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonImg, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader,
  IonLabel, IonItem, IonCardSubtitle, IonFooter, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { NavigationService } from '../../services/navigation.service'; // Importamos el servicio de navegación

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader,
    IonLabel, IonItem, IonCardSubtitle, IonFooter, IonSelect, IonSelectOption
  ]
})
export class PrivacidadPage implements OnInit {


  constructor(private navigationService: NavigationService) { } // Constructor del componente donde inyectamos los servicios necesarios

  async ngOnInit() {

  }

  //Métodos de navegación utilizando el servicio de navegación 
  goToHome() {
    this.navigationService.goToHome();
  }

  goToSobreNosotros() {
    this.navigationService.goToSobreNosotros();
  }

  goToPrivacidad() {
    this.navigationService.goToPrivacidad;
  }

  onRutinaChange(event: any) {
    this.navigationService.goToRutina(event.detail.value);
  }


}
