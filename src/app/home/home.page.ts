import { Component } from '@angular/core';
//import { IonicModule } from '@ionic/angular'; // Agrega IonicModule aquí
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonFooter, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardContent, IonFooter, IonGrid, IonCardTitle
  ],
})
export class HomePage {
  constructor() {}
}
