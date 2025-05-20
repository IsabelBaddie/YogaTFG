import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
  IonSelect, IonSelectOption, IonFooter, IonButtons, IonCardHeader, IonCardTitle, IonCard, IonCardContent,
   IonCol, IonList, IonGrid, IonRow, IonText, 
} from '@ionic/angular/standalone';
import { PosturarutinaService } from 'src/app/services/posturarutina.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { PosturaI } from 'src/app/models/postura.models';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-verguiada',
  templateUrl: './verguiada.page.html',
  styleUrls: ['./verguiada.page.scss'],
  standalone: true,
  imports: [IonCol, IonCardContent, IonCard, IonCardTitle, IonCardHeader, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonItem, IonSelect, IonSelectOption, IonFooter, IonButtons, IonList, IonGrid, IonRow, IonText, 
  ]
})
export class VerguiadaPage implements OnInit {

  //VARIABLES DEL COMPONENTE
  posturasSeleccionadas: PosturaI[] = [];
  todasLasPosturas: PosturaI[] = [];
  posturasSeleccionadasId: { [key: string]: string } = {}; // inicializa el objeto vacío
  public rutinaId: string = ''; // 

  constructor(private posturaRutinaService: PosturarutinaService,
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

  async verPosturasDeRutina(rutinaId: string) {
    try {
      this.posturasSeleccionadas = await this.posturaRutinaService.getPosturasDeRutina(rutinaId);
      console.log('Posturas asociadas a la rutina:', this.posturasSeleccionadas);

      for (let i in this.posturasSeleccionadas) {
        console.log("El video de la postura" + this.posturasSeleccionadas[i] + "es" + this.posturasSeleccionadas[i].video); // 1, 2, 3
      }

    } catch (error) {
      console.error('Error al obtener las posturas:', error);
    }
  }

    transformarUrlYoutube(url: string): string {
  const videoId = url.split('v=')[1]?.split('&')[0]; // extrae el ID
  return `https://www.youtube.com/embed/${videoId}`;
}

}
