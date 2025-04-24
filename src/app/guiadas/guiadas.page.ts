import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, 
  IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter,
  IonItem

 } from '@ionic/angular/standalone';
import { Rutina } from '../models/Rutina';
import { NavigationService } from '../services/navigation.service';



@Component({
  selector: 'app-guiadas',
  templateUrl: './guiadas.page.html',
  styleUrls: ['./guiadas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, 
    IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonItem
  ]
})
export class GuiadasPage implements OnInit {

  
  rutinas: Rutina[] = [];

  ngOnInit() {
  }

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
   

}
