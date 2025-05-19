import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, 
   IonSelect, IonSelectOption, IonFooter, IonButtons
 } from '@ionic/angular/standalone';
import { PosturarutinaService } from 'src/app/services/posturarutina.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PosturaI } from 'src/app/models/postura.models';

@Component({
  selector: 'app-verguiada',
  templateUrl: './verguiada.page.html',
  styleUrls: ['./verguiada.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonItem, IonSelect, IonSelectOption, IonFooter, IonButtons
  ]
})
export class VerguiadaPage implements OnInit {

   constructor(private posturaRutinaService: PosturarutinaService, private navigationService: NavigationService) { }

  ngOnInit() {
  }

      selectedPosturas: PosturaI[] = [];
  
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
  
  
      async showPosturas(rutinaId: string) {
      // Mostrar posturas de esa rutina
      try {
        this.selectedPosturas = await this.posturaRutinaService.getPosturasDeRutina(rutinaId);
        console.log('Posturas asociadas a la rutina:', this.selectedPosturas);
      } catch (error) {
        console.error('Error al obtener las posturas:', error);
      }
    }

}
