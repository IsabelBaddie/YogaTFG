import { Component } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
  IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView
} from '@ionic/angular/standalone';

import { collection, getDocs } from 'firebase/firestore';

import { PosturaI } from '../../models/postura.models';

import { Firestore } from '@angular/fire/firestore';

import { NavigationService } from '../../services/navigation.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
    IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView
  ],
})
export class HomePage {

  constructor(private navigationService: NavigationService, private categoriasService : CategoriasService,
    private firestore: Firestore
  ) { }


  categorias: any[] = [];
   posturasPorCategoria: { [categoriaId: string]: PosturaI[] } = {}; // Diccionario para guardar resultados por categoría
  categoriaSeleccionadaId: string | null = null;
  todasLasPosturas: PosturaI[] = [];

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

  login() {
    console.log('Login clicked');
  }

  logout() {
    console.log('Logout clicked');
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

    async cargarCategorias(): Promise<void> {
    try {
      this.categorias = await this.categoriasService.getTodasCategorias();
      console.log('Categorías cargadas:', this.categorias);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
    console.log('IDs de categorías:', this.categorias.map(c => c.id));

  }


  async cargarTodasLasPosturasPorCategoria() {
    for (const categoria of this.categorias) {
      const posturas = await this.categoriasService.getPosturasDeCategoria(categoria.id);
      this.posturasPorCategoria[categoria.id] = posturas;
      console.log(`Posturas de la categoría ${categoria.nombre}:`, posturas);
    }
  }
}
