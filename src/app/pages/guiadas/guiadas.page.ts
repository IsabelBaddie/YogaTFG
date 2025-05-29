import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

//Modelos 
import { RoutineI } from '../../models/routine.models';
import { ComentarioI } from '../../models/comentario.models';
import { UserI } from '../../models/user.models';
//Componente (la modal de comentarios)
import { ComentarioModalComponent } from '../../componentes/comentario-modal/comentario-modal.component';
//Servicios
import { NavigationService } from '../../services/navigation.service';
import { RutinasService } from '../../services/rutinas.service';
import { FirestoreService } from '../../services/firestore.service';
import { AutenticacionService } from '../../services/autenticacion.service';

import { Timestamp } from 'firebase/firestore';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-guiadas',
  templateUrl: './guiadas.page.html',
  styleUrls: ['./guiadas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class GuiadasPage implements OnInit {

  // Variables
  rutinas: RoutineI[] = []; // Para almacenar las rutinas
  rutinaSeleccionadaId: string = '';
  usuarioActivo: UserI = { id: '', nombre: '', email: '', password: '' };
  filtroMeta: string = ''; // Para almacenar el tipo de meta seleccionada
  rutinasFiltradas: RoutineI[] = []; //Para almacenar las rutinas filtradas


  constructor( //Iyeccion de los servicios
    private navigationService: NavigationService,
    private rutinaService: RutinasService,
    private firestoreService: FirestoreService,
    private autenticacionService: AutenticacionService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { } 

  async ngOnInit() { 
    this.rutinas = await this.rutinaService.getRutinasGuiadas(); // Obtener las rutinas guiadas gracias al servicio
    this.rutinasFiltradas = this.rutinas; // Inicialmente no hay ningún filtro aplicado
    try { //Intentamos obtener los datos del usuario autenticado para luego poder comentar o no en base a eso
      const datosUsuario: UserI = await this.autenticacionService.obtenerDatosUsuario();
      this.usuarioActivo.id = datosUsuario.id || '';
      this.usuarioActivo.nombre = datosUsuario.nombre || '';
      this.usuarioActivo.email = datosUsuario.email || '';
      console.log('Usuario autenticado:', this.usuarioActivo);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  // Métodos para navegar a otras páginas usando el servicio de navegación
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

  // Método para abrir el modal de comentarios, recibiendo el ID de la rutina seleccionada
  async abrirModalComentario(rutinaId: string) {
    this.rutinaSeleccionadaId = rutinaId; // Guardamos el ID de la rutina seleccionada

    const modal = await this.modalController.create({ //Creamos la modal
      component: ComentarioModalComponent, //Este será el contenido de la modal
    });

    await modal.present(); //Mostramos la modal

    const result = await modal.onWillDismiss(); //Esperamos a que se cierre la modal y obtenemos el resultado
    if (result.data?.contenido) { // Si hay contenido lo guardamos
      await this.guardarComentario(result.data.contenido); //Utilizamos el método para guardar el comentario
    }
  }

  async guardarComentario(contenido: string) { // Método para guardar el comentario recibe el contenido del comentario por la modal
    if (!this.usuarioActivo.id) { //si no hay usuario autenticado no se puede comentar
      const toast = await this.toastController.create({ //Creamos un toast para mostrar el error
        message: 'Debes estar autenticado para poder comentar.',
        duration: 3000,
        position: 'top',
        color: 'danger'  
      });
      await toast.present(); //Mostramos el toast
      return;
    }

     if (!contenido || contenido.trim() === '') {
      const toast = await this.toastController.create({
        message: 'El contenido del comentario no puede estar vacío.', //Creamos un toast si el contenido está vacío
        duration: 3000,
        position: 'top',
        color: 'warning'  
      });
      await toast.present(); //Mostramos el toast
      return;
    }

    // Creamos el objeto del comentario
    const comentario: ComentarioI = {
      id: this.firestoreService.generarIdAleatorio(),
      contenido,
      fechaPublicacion: new Timestamp(Date.now() / 1000, 0),
      usuario_id: this.usuarioActivo.id,
      rutina_id: this.rutinaSeleccionadaId
    };

    try {
      await this.firestoreService.crearDocumentoID(comentario, 'comentarios', comentario.id); // Guardamos el comentario en Firestore
      console.log('Comentario guardado:', comentario);
    } catch (error) {
      console.error('Error al guardar el comentario en Firestore:', error);
    }
  }

  filtrarPorMeta(event: any) {
    const metaSeleccionada = event.detail.value; // Obtenemos el valor de la meta seleccionada

    this.filtroMeta = metaSeleccionada; // Guardamos el tipo de filtro que estamos aplicando que es la meta seleccionada

    //Asignamos a la variable rutinasFiltradas el resultado de filtrar las rutinas
    this.rutinasFiltradas = this.rutinas.filter(rutina =>
      rutina.tipo.toLowerCase() === metaSeleccionada.toLowerCase() //Si la rutina tiene el mismo tipo que la meta seleccionada
    );
  }

  // Método para navegar a la página de la rutina guiada seleccionada
  empezarRutina(rutina_id: string) {
    console.log('Empezamos la rutina ' + rutina_id);
    this.navigationService.comienzaRutinaGuiada(rutina_id);
  }

}
