import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect, IonSpinner
} from '@ionic/angular/standalone';



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
    IonButtons, IonImg, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelectOption,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonSelect
  ]
})
export class PersonalizadasPage implements OnInit {

  constructor(private navigationService: NavigationService,
    private autenticacionService: AutenticacionService,
    private rutinausuarioService: RutinausuarioService,
    private storageService: StorageService,
    private firestoreService: FirestoreService) { }

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


  /*async saveRoutine() {
    this.cargando = true;
    await this.firestoreService.createDocumentID(this.nuevaRutina, 'rutinas', this.nuevaRutina.id);
    this.cargando = false;
    this.initRoutine();
    this.cargarRutinasUsuario(); // Recargar rutinas después de guardar una nueva
  }

    // Asignar una nueva rutina al usuario
  async asignarRutina(rutinaId: string) {
    if (this.usuarioActivo) {
      await this.rutinausuarioService.asignarRutinaAUsuario(this.usuarioActivo.id, rutinaId);
      this.cargarRutinasUsuario(); // Recargar las rutinas del usuario
    }
  }*/

async guardarYAsignarRutina() {
 if (!this.usuarioActivo) {
   console.error('No hay usuario autenticado para asignar la rutina.');
   return;
 }

 this.cargando = true;

 try {
   console.log('Valores antes de guardar:', this.nuevaRutina);

   // 1. Guardar la rutina en la colección "rutinas"
   await this.firestoreService.createDocumentID(this.nuevaRutina, 'rutinas', this.nuevaRutina.id);

   // 2. Asignar la rutina al usuario actual
   await this.rutinausuarioService.asignarRutinaAUsuario(this.usuarioActivo.id, this.nuevaRutina.id);

   // 3. Recargar las rutinas después de guardar
   await this.cargarRutinasUsuario();  // Recargar rutinas después de guardar

   // 4. Reiniciar el formulario de rutina
   this.initRoutine(); 

 } catch (error) {
   console.error('Error al guardar y asignar la rutina:', error);
 } finally {
   this.cargando = false;
 }
}




}
