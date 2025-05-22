import { Component, OnInit } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
  IonFooter, IonCardTitle, IonList, IonItem, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, IonLabel, IonSegmentContent, IonSegmentView, IonAlert,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PosturaI } from '../../models/postura.models'; //MODELOS

import { Firestore } from '@angular/fire/firestore'; //FIRESTORE
import { collection, getDocs } from 'firebase/firestore';

import { NavigationService } from '../../services/navigation.service'; //SERVICIOS 
import { CategoriasService } from '../../services/categorias.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { StorageService } from 'src/app/services/storage.service';
import { CategoriaI } from 'src/app/models/categoria.models';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonAlert,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent,
    IonFooter, IonCardTitle, IonItem, IonSelect, IonSelectOption,
    IonSegment, IonSegmentButton ,
    FormsModule, CommonModule, IonAlert, IonButton
  ],
})
export class HomePage implements OnInit {

  

  constructor(private navigationService: NavigationService, private categoriasService: CategoriasService,
    private firestore: Firestore, private autenticacion: AutenticacionService, private storageService: StorageService
  ) { }

  async ngOnInit() { // Lógica que se ejecuta al iniciar el componente
    this.cargarTodasLasCategorias(); //Cargamos todas las categorías
    this.cargarTodasLasPosturas(); //Cargamos todas las posturas

  }

  categorias: CategoriaI[] = []; // Array para almacenar las categorías
  // Diccionario para guardar las posturas por categoría, el key es el id de la categoría y el value es un array de posturas
  posturasPorCategoria: { [categoriaId: string]: PosturaI[] } = {}; 
  categoriaSeleccionadaId: string | null = null;
  todasLasPosturas: PosturaI[] = [];
  alertButtons = ['Aceptar'];

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

  async logout() { // Método para cerrar sesión
    try {
      await this.autenticacion.logout();
      await this.storageService.remove('usuarioActivo')
      console.log('Sesión cerrada correctamente');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }

  async cargarTodasLasPosturas() {
    const colRef = collection(this.firestore, 'posturas'); //Obtenemos la referencia a la colección de posturas
    const snapshot = await getDocs(colRef); //Obtenemos los documentos de la colección
    // Mapeamos los documentos a un array de PosturaI
    this.todasLasPosturas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PosturaI[];

    console.log('Posturas cargadas:', this.todasLasPosturas);
    console.log('Posturas con categoría_id:', this.todasLasPosturas.map(p => p.categoria_id));

  }
  
  async cargarTodasLasCategorias(): Promise<void> {
    try {
      this.categorias = await this.categoriasService.getTodasCategorias();
      console.log('Categorías cargadas:', this.categorias);

      if (this.categorias.length > 0) {
        // Asignar la primera categoría para que ion-segment la muestre seleccionada por defecto
        this.categoriaSeleccionadaId = this.categorias[0].id;

        if (this.categoriaSeleccionadaId) { //Si hay una categoría seleccionada cargamos las posturas de esa categoría
          await this.cargarPosturasDeCategoria(this.categoriaSeleccionadaId);
        }
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  onCategoriaChange(event: any) { // Método que se ejecuta al cambiar la categoría seleccionada en el ion-segment
    const categoriaId = event.detail.value; // Obtenemos el id de la categoría seleccionada
    this.categoriaSeleccionadaId = categoriaId; // Asignamos el id de la categoría seleccionada
    this.cargarPosturasDeCategoria(categoriaId); // Cargamos las posturas de la categoría seleccionada
  }

  async cargarPosturasDeCategoria(categoriaId: string) {
    // Método que carga las posturas de una categoría específica llamando al servicio y guardando el resultado en el diccionario
    this.posturasPorCategoria[categoriaId] = await this.categoriasService.getPosturasDeCategoria(categoriaId);
  }

}
