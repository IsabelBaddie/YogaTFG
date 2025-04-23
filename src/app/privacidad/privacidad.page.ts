import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonImg, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader,
  IonLabel, IonItem, IonCardSubtitle, IonFooter
 } from '@ionic/angular/standalone';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonImg, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader,
    IonLabel, IonItem, IonCardSubtitle, IonFooter
  ]
})
export class PrivacidadPage implements OnInit {

  
      constructor(private navigationService: NavigationService) {}
  
      goToHome() {
        this.navigationService.goToHome();
      }
      
      goToSobreNosotros() {
        this.navigationService.goToSobreNosotros();
      }
  
      goToPrivacidad() {
        this.navigationService.goToPrivacidad;
      }

  ngOnInit() {
  }

}
