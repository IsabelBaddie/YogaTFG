import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect, IonSpinner,
  IonInput, IonToast
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';


import { NavigationService } from '../../services/navigation.service';
import { Dificultad, RoutineI, Tipo } from 'src/app/models/routine.models';
import { UserI } from 'src/app/models/user.models';
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

    // Registramos los iconos que se van a usar
    addIcons({ create: icons['create'], trash: icons['trash'] });
  }

  async ngOnInit() {
    await this.loadUser(); //Cargamos el usuario activo
    this.initRoutine(); // Inicializamos una rutina vacía para el formulario
  }

  //VARIABLES DEL COMPONENTE
  rutinas: RoutineI[] = [];
  usuarioActivo: UserI | null = null; // Variable para almacenar el usuario activo
  nuevaRutina: RoutineI = {
    id: this.firestoreService.generarIdAleatorio(), //Creamos objeto RoutineI para rutina nueva o en edición
    nombre: "",
    dificultad: Dificultad.Dificil,
    duracion: null,
    fechaCreacion: new Date(),
    tipo: Tipo.Fuerza,
    esGuiada: false,
  };

  cargando: boolean = false; //Indicador de carga


  dificultadSeleccionada: Dificultad | '' = ''; // Filtro de dificultad seleccionada
  Dificultad = Dificultad; // Para usarlo en el HTML, referencia al enum

  get rutinasFiltradas(): any[] { //Método que devuelve las rutinas filtradas por la dificultad
    if (!this.dificultadSeleccionada) return this.rutinas;
    return this.rutinas.filter(r => r.dificultad === this.dificultadSeleccionada);
  }

  //Métodos para la navegación
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
        const datos = await this.autenticacionService.obtenerDatosUsuario(); //Usamos nuestro servicio para obtener los datos del usuario
        this.usuarioActivo = datos; //Asignamos al usuario activo esos datos
        await this.storageService.set('usuarioActivo', datos); //Lo guardamos en el Storage gracias al Storage Service
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

  initRoutine() { //Para inicializar el formulario de la rutina 
    const hoy = new Date();

    this.nuevaRutina = {
      id: this.firestoreService.generarIdAleatorio(),
      nombre: "", 
      dificultad: Dificultad.Dificil, 
      duracion: null,
      fechaCreacion: new Date(),
      tipo: Tipo.Fuerza,
      esGuiada: false, //establecemos que no es guiada
    };
  }

  async guardarYAsignarRutina() { //Método para guardar/editar rutina y asignarsela al usuario 
    if (!this.usuarioActivo) { //Si no hay usuario 
      const toast = await this.toastController.create({
        message: 'Debes estar autenticado para guardar una rutina.',
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      console.log('entra en la tostada de aviso de debes estar autenticado para guardar rutina'); 
      return;
    }

    if (!this.nuevaRutina.nombre || this.nuevaRutina.nombre.trim() === '') { //Si no me han metido nombre
      const toast = await this.toastController.create({
        message: 'El nombre de la rutina es obligatorio.',
        duration: 3000,
        position: 'top',
        color: 'warning'
      });
      await toast.present();
       console.log('entra en la tostada de aviso de nombre de rutina obligatorio'); 
      return;
    }

    this.cargando = true;

    try {
      console.log('Valores antes de guardar:', this.nuevaRutina);

      // Verificamos si la rutina ya existe es decir si estamos editando .some()devuelve true si algún elemento cumple la condición
      const esRutinaExistente = this.rutinas.some(r => r.id === this.nuevaRutina.id);

      // Guardamos/actualizamos la rutina en Firestore
      await this.firestoreService.crearDocumentoID(this.nuevaRutina, 'rutinas', this.nuevaRutina.id);

      // Si es nueva rutina, asignamos al usuario. Si estamos editando, NO asignamos de nuevo.
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

  async eliminarRutina(routine: RoutineI) { //Método para eliminar una rutina especifica
    this.cargando = true;
    await this.firestoreService.borrarDocumentoID('rutinas', routine.id);
    this.cargando = false;
    this.cargarRutinasUsuario(); //Actualizar la lista despues de borrar 
  }

  editarRutina(routine: RoutineI) { // Cargar una rutina en el formulario para edición
    console.log("Editando rutina -> ", routine);
    // this.nuevaRutina = routine;
    this.nuevaRutina = { ...routine }; // Copia del objeto para edición
  }

}
