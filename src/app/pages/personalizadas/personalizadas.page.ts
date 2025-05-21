import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect, IonSpinner,
  IonInput, IonToast
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';


import { NavigationService } from '../../services/navigation.service';
import { Dificultad, RoutineI, Tipo } from 'src/app/models/routine.models';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { RutinausuarioService } from 'src/app/services/rutinausuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-personalizadas',
  templateUrl: './personalizadas.page.html',
  styleUrls: ['./personalizadas.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption,
    IonCard, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect, IonInput,
  ]
})
export class PersonalizadasPage implements OnInit {

  constructor(private navigationService: NavigationService,
    private autenticacionService: AutenticacionService,
    private rutinausuarioService: RutinausuarioService,
    private storageService: StorageService,
    private firestoreService: FirestoreService,
    private toastController: ToastController
  ) {

    addIcons({ create: icons['create'], trash: icons['trash'] });
  }

  async ngOnInit() {
    await this.loadUser();
    this.initRoutine(); // Inicializamos una rutina vacía para el formulario
  }

  //VARIABLES DEL COMPONENTE
  rutinas: RoutineI[] = [];
  usuarioActivo: any = null; // Variable para almacenar el usuario activo
  nuevaRutina: RoutineI = {
    id: this.firestoreService.createIdDoc(),
    nombre: "",
    dificultad: Dificultad.Dificil,
    duracion: null,
    fechaCreacion: new Date(),
    tipo: Tipo.Fuerza,
    esGuiada: false,
  };

  cargando: boolean = false;


  dificultadSeleccionada: Dificultad | '' = '';
  Dificultad = Dificultad; // Para usarlo en el HTML

  get rutinasFiltradas(): any[] {
    if (!this.dificultadSeleccionada) return this.rutinas;
    return this.rutinas.filter(r => r.dificultad === this.dificultadSeleccionada);
  }

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

  empezarRutina(rutina_id: string) {
    // Navegamos a una pagina que gestiona la rutina 
    console.log('empezamos la rutina' + rutina_id);
    this.navigationService.comienzaRutinaPersonalizada(rutina_id);
  }


  // Cargar usuario activo desde el almacenamiento o Firebase
  async loadUser() {
    this.autenticacionService.onAuthStateChanged(async (user) => {
      if (user) {
        const datos = await this.autenticacionService.obtenerDatosUsuario();
        this.usuarioActivo = datos;
        await this.storageService.set('usuarioActivo', datos);
        await this.cargarRutinasUsuario();  // Cargar rutinas del usuario una vez esté autenticado
      } else {
        console.log('No hay usuario autenticado');
        this.usuarioActivo = null;
        await this.storageService.remove('usuarioActivo');
      }
    });
  }

  // Cargar las rutinas asociadas al usuario
  async cargarRutinasUsuario() {
    if (this.usuarioActivo) {
      this.rutinas = await this.rutinausuarioService.getRutinasDeUsuario(this.usuarioActivo.id);
      console.log('Rutinas del usuario cargadas:', this.rutinas);
    }
  }

  initRoutine() {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0];
    this.nuevaRutina = {
      id: this.firestoreService.createIdDoc(),
      nombre: "", // Inicializado correctamente
      dificultad: Dificultad.Dificil, // Valor inicial válido
      duracion: null,
      fechaCreacion: new Date(fechaFormateada),
      tipo: Tipo.Fuerza,
      esGuiada: false,
    };
  }

async guardarYAsignarRutina() {
  if (!this.usuarioActivo) {
    const toast = await this.toastController.create({
      message: 'Debes estar autenticado para guardar una rutina.',
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
    return;
  }

  if (!this.nuevaRutina.nombre || this.nuevaRutina.nombre.trim() === '') {
    const toast = await this.toastController.create({
      message: 'El nombre de la rutina es obligatorio.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
    return;
  }

  this.cargando = true;

  try {
    console.log('Valores antes de guardar:', this.nuevaRutina);

    // Verificamos si la rutina ya existe (edición)
    const esRutinaExistente = this.rutinas.some(r => r.id === this.nuevaRutina.id);

    // Guardamos (o actualizamos) la rutina en Firestore
    await this.firestoreService.createDocumentID(this.nuevaRutina, 'rutinas', this.nuevaRutina.id);

    // Si es nueva rutina, asignamos al usuario. Si es edición, NO asignamos de nuevo.
    if (!esRutinaExistente) {
      await this.rutinausuarioService.asignarRutinaAUsuario(this.usuarioActivo.id, this.nuevaRutina.id);
    }

    // Recargamos las rutinas para actualizar la lista
    await this.cargarRutinasUsuario();

    // Reiniciamos el formulario para nueva rutina
    this.initRoutine();

  } catch (error) {
    console.error('Error al guardar y asignar la rutina:', error);
  } finally {
    this.cargando = false;
  }
}

  async deleteRoutine(routine: RoutineI) {
    this.cargando = true;
    await this.firestoreService.deleteDocumentID('rutinas', routine.id);
    this.cargando = false;
    this.cargarRutinasUsuario();
  }

  editarRutina(routine: RoutineI) {
    console.log("Editando rutina -> ", routine);
   // this.nuevaRutina = routine;
   this.nuevaRutina = { ...routine };
  }




}
