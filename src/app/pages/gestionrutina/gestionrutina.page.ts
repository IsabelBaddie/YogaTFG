import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gestionrutina',
  templateUrl: './gestionrutina.page.html',
  styleUrls: ['./gestionrutina.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GestionrutinaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
