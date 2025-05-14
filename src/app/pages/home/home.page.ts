import { Component, OnInit } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
  IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView,
  
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

import { collection, getDocs } from 'firebase/firestore';

import { PosturaI } from '../../models/postura.models';

import { Firestore } from '@angular/fire/firestore';

import { NavigationService } from '../../services/navigation.service';
import { CategoriasService } from '../../services/categorias.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
    IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView,
       FormsModule, CommonModule
  ],
})
export class HomePage implements OnInit {

nombreUsuario: string = ''; // Para almacenar el nombre del usuario

  constructor(private navigationService: NavigationService, private categoriasService : CategoriasService,
    private firestore: Firestore, private autenticacion: AutenticacionService, private storageService: StorageService 
  ) { }

    async ngOnInit() {
    this.cargarCategorias();
    this.cargarTodasLasPosturas();

        // Recuperar el nombre del usuario desde el almacenamiento
    const nombre = await this.storageService.get('nombreUsuario');
    if (nombre) {
      this.nombreUsuario = nombre;
    }
  }

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



  async logout() { // Método para cerrar sesión
    try {
      await this.autenticacion.logout();
         await this.storageService.remove('usuarioActivo');
      console.log('Sesión cerrada correctamente');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
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

onCategoriaChange(event: any) {
  const categoriaId = event.detail.value;
  this.categoriaSeleccionadaId = categoriaId;
  this.cargarPosturasDeCategoria(categoriaId);
}

async cargarPosturasDeCategoria(categoriaId: string) {
  this.posturasPorCategoria[categoriaId] = await this.categoriasService.getPosturasDeCategoria(categoriaId);
}

}
