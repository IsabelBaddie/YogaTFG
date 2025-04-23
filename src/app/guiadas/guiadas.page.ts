import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, 
  IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter

 } from '@ionic/angular/standalone';
import { Rutina } from '../models/Rutina';



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

  constructor() { }
  rutinas: Rutina[] = [];

  ngOnInit() {
    

  }

}
