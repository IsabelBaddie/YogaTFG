import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PosturaI } from 'src/app/models/postura.models'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem,
  IonInput, IonList, IonRadio, IonRadioGroup, IonLabel, IonFooter
 } from "@ionic/angular/standalone";

import { CommonModule } from '@angular/common'; //para poder usar *ngIf y ngFor* 
import { FormsModule } from '@angular/forms'; //para poder usar *ngIf y ngFor* 


@Component({
  selector: 'app-posturas-modal',
  templateUrl: './posturas-modal.component.html',
  styleUrls: ['./posturas-modal.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem,
  IonInput, IonList, IonRadio, IonRadioGroup, IonLabel, IonFooter, CommonModule, FormsModule
  ]
})
export class PosturasModalComponent  {

  @Input() posturas: PosturaI[] = []; //porque mi modal recibe un array de objetos PosturaI

  filtro: string = ''; //para guardar la postura que escribe el usuario
  posturaSeleccionadaId: string | null = null; //para almacenar el id de la posutra que el usuario elije 

  constructor(private modalControler: ModalController) {} 

  posturasFiltradas(): PosturaI[] { //método para el filtro, que retorna los objetos PosturaI que coinciden
    return this.posturas.filter(p => //del array de recibimos filtramos, viendo si el nombre de la postura incluye el que me meten en el filtro, todo esto pasado a minúscula 
      p.postura.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  cerrar() {
    this.modalControler.dismiss(); //cierra la modal
  }

  confirmar() {
    //del array que recibimos buscamos la postura que su id coincida con posturaSeleccionadaId que es el id que el usuario selecciona con nuestro ion-radio
    //pasamos los id a string para comparar bien ambos valores
    const seleccionada = this.posturas.find(p => String(p.id) === String(this.posturaSeleccionadaId));
    this.modalControler.dismiss(seleccionada); //cierra la modal pero le pasamos al componente que la abrio la postura seleccionada
  }

}
