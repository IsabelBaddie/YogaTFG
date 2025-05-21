import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonSelect,
  IonSelectOption, IonFooter, IonButtons, IonText, IonList, IonLabel, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { PosturarutinaService } from 'src/app/services/posturarutina.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PosturaI } from 'src/app/models/postura.models';

import { ActivatedRoute } from '@angular/router';

import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-verpersonalizada',
  templateUrl: './verpersonalizada.page.html',
  styleUrls: ['./verpersonalizada.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonText, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonItem, IonSelect, IonSelectOption, IonFooter, IonButtons, IonList, IonRow, IonCol
  ]
})
export class VerpersonalizadaPage implements OnInit {
  //VARIABLES DEL COMPONENTE
  posturasSeleccionadas: PosturaI[] = [];
  todasLasPosturas: PosturaI[] = [];
  posturasSeleccionadasId: { [key: string]: string } = {}; // inicializa el objeto vacío
  public rutinaId: string = ''; // 

  constructor(
    private posturaRutinaService: PosturarutinaService,
    private navigationService: NavigationService,
    private route: ActivatedRoute, // para leer rutinaId
    private firestore: Firestore,
    public sanitizer: DomSanitizer //para ver el video 
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.rutinaId = id; // <-- Guarda el ID para que esté accesible siempre
      await this.cargarTodasLasPosturas();
      await this.verPosturasDeRutina(this.rutinaId);
    } else {
      console.error("No se proporcionó rutinaId");
    }
  }

  async verPosturasDeRutina(rutinaId: string) {
    try {
      this.posturasSeleccionadas = await this.posturaRutinaService.getPosturasDeRutina(rutinaId);
      console.log('Posturas asociadas a la rutina:', this.posturasSeleccionadas);

      for (let i in this.posturasSeleccionadas) {
        console.log("El video de la postura"  + this.posturasSeleccionadas[i] + "es" + this.posturasSeleccionadas[i].video); // 1, 2, 3
      }

    } catch (error) {
      console.error('Error al obtener las posturas:', error);
    }
  }

  // Navegación común
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


  async cargarTodasLasPosturas() {
    const colRef = collection(this.firestore, 'posturas');
    const snapshot = await getDocs(colRef);
    this.todasLasPosturas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PosturaI[];

    console.log('Posturas cargadas:', this.todasLasPosturas);
    console.log('Posturas con categoría_id:', this.todasLasPosturas.map(p => p.categoria_id));

  }

  async asociarPostura() {
    const posturaId = this.posturasSeleccionadasId[this.rutinaId];
    if (!posturaId || !this.rutinaId) return;
    console.log('Asociando postura:', posturaId, 'a rutina:', this.rutinaId);
    await this.posturaRutinaService.addPosturaARutina(this.rutinaId, posturaId);
    this.posturasSeleccionadasId[this.rutinaId] = ''; // Limpiar selección
    this.verPosturasDeRutina(this.rutinaId); // Refrescar lista
  }

  async eliminarPostura(posturaId: string) {
    if (!this.rutinaId) return;

    await this.posturaRutinaService.eliminarPosturaDeRutina(this.rutinaId, posturaId);
    await this.verPosturasDeRutina(this.rutinaId); // Recarga la lista
  }

  transformarUrlYoutube(url: string): string {
  const videoId = url.split('v=')[1]?.split('&')[0]; // extrae el ID
  return `https://www.youtube.com/embed/${videoId}`;
}


}
