import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
  IonSelect, IonSelectOption, IonFooter, IonButtons, IonCardHeader, IonCardTitle, IonCard, IonCardContent,
  IonCol, IonList, IonGrid, IonRow, IonText,
} from '@ionic/angular/standalone';
//Servicios
import { PosturarutinaService } from 'src/app/services/posturarutina.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router'; //Para acceder a los parámetros de la ruta, como el ID de la rutina
import { PosturaI } from 'src/app/models/postura.models'; //Modelo
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { DomSanitizer } from '@angular/platform-browser'; //Para el vídeo 


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
  posturasSeleccionadas: PosturaI[] = []; // Posturas de la rutina actual
  posturasSeleccionadasId: { [key: string]: string } = {}; // Inicializamos el objeto vacío
  public rutinaId: string = ''; // 

  constructor(private posturaRutinaService: PosturarutinaService,
    private navigationService: NavigationService,
    private route: ActivatedRoute, //Para leer rutinaId
    private firestore: Firestore,
    public sanitizer: DomSanitizer //Para ver el video 
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); //Obtenemos el id de la rutina desde la URL
    if (id) {
      this.rutinaId = id; //Guardamos el id en rutinaId para que esté accesible siempre
      await this.verPosturasDeRutina(this.rutinaId); // Llamamos a la función para obtener las posturas de la rutina
    } else {
      console.error("No se proporcionó rutinaId");
    }
  }

  //Métodos para navegar a otras páginas
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


  async verPosturasDeRutina(rutinaId: string) {
    try {
      this.posturasSeleccionadas = await this.posturaRutinaService.getPosturasDeRutinaGuiada(rutinaId, true);
      console.log('Posturas asociadas a la rutina:', this.posturasSeleccionadas);
    } catch (error) {
      console.error('Error al obtener las posturas:', error);
    }
  }

  transformarUrlYoutube(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0]; // extrae el ID
    return `https://www.youtube.com/embed/${videoId}`;
  }

}
