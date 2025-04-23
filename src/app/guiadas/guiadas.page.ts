import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, 
  IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter

 } from '@ionic/angular/standalone';
import { Rutina } from '../models/Rutina';
import { Router } from '@angular/router';



@Component({
  selector: 'app-guiadas',
  templateUrl: './guiadas.page.html',
  styleUrls: ['./guiadas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, 
    IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter
  ]
})
export class GuiadasPage implements OnInit {

  
  rutinas: Rutina[] = [];

  ngOnInit() {
  }

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

}
