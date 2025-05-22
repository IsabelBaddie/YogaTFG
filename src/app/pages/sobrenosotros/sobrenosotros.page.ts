import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonSegment, IonButton, IonSegmentButton,
  IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonFooter,
  IonItem, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

declare const google: any;

import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sobrenosotros',
  templateUrl: './sobrenosotros.page.html',
  styleUrls: ['./sobrenosotros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonGrid, IonRow, IonCol, IonFooter, IonItem, IonSelect, IonSelectOption
  ]
})
export class SobrenosotrosPage implements OnInit, AfterViewInit {
  // Definimos las propiedades del componente, nos crearemos un array de objetos, cada objeto es una de mis tarjetas
  cards = [
    {
      img: 'assets/img/mandala5.png',
      titulo: '2015 | AsanaFlow 360° «Bienestar total»',
      descripcion: 'El lanzamiento de AsanaFlow 360° ofreció una plataforma completa para principiantes y expertos, con clases guiadas en diferentes estilos de yoga, meditación y mindfulness, todo en un solo lugar.'
    },
    {
      img: 'assets/img/mandala6.png',
      titulo: '2017 | AsanaFlow Meditación «Equilibrio interior»',
      descripcion: 'Con la introducción de la funcionalidad de meditación, AsanaFlow Meditación se convirtió en la herramienta perfecta para aquellos que buscaban paz mental y reducción del estrés, integrando prácticas de mindfulness en su rutina diaria.'
    },
    {
      img: 'assets/img/mandala1.png',
      titulo: '2019 | AsanaFlow Pro «Para los más exigentes»',
      descripcion: 'AsanaFlow Pro fue diseñado para yoguis avanzados, con entrenamientos desafiantes, tutoriales detallados y planes de desarrollo físico y mental personalizados. Perfecto para aquellos que buscan mejorar su práctica.'
    },
    {
      img: 'assets/img/mandala9.png',
      titulo: '2021 | AsanaFlow Yoga Flow «Fluye con tu cuerpo»',
      descripcion: 'En 2021, AsanaFlow Yoga Flow presentó una nueva modalidad interactiva que permite a los usuarios seguir secuencias de yoga en tiempo real, personalizadas según sus necesidades y nivel de experiencia, haciendo que cada clase sea única.'
    }
  ];

  constructor(private navigationService: NavigationService) { } // Constructor del componente donde inyectamos los servicios necesarios
  
  async ngOnInit() { }

  
  ngAfterViewInit(): void {
    this.initMap();
  }

// Métodos de navegación utilizando el servicio de navegación
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

    async initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
}




