import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect
 } from '@ionic/angular/standalone';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-personalizadas',
  templateUrl: './personalizadas.page.html',
  styleUrls: ['./personalizadas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter,  IonSelect
  ]
})
export class PersonalizadasPage implements OnInit {

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

  ngOnInit() {
  }

}
