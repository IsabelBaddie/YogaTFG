import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { RoutineI } from '../models/routine.models';
import { ComentarioI } from '../models/comentario.models';
import { UserI } from '../models/user.models';

import { ComentarioModalComponent } from '../componentes/comentario-modal/comentario-modal.component';
import { NavigationService } from '../services/navigation.service';
import { RutinasService } from '../services/rutinas.service';
import { FirestoreService } from '../services/firestore.service';
import { AutenticacionService } from '../services/autenticacion.service';

import { Timestamp } from 'firebase/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guiadas',
  templateUrl: './guiadas.page.html',
  styleUrls: ['./guiadas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarioModalComponent
  ]
})
export class GuiadasPage implements OnInit {


  rutinas: RoutineI[] = [];
  rutinaSeleccionadaId: string = '';
  usuarioActivo: UserI = { id: '', nombre: '', email: '', password: '' };
  filtroTipo: string = ''; 
  rutinasFiltradas: RoutineI[] = [];


  constructor(
    private navigationService: NavigationService,
    private rutinaService: RutinasService,
    private firestoreService: FirestoreService,
    private autenticacionService: AutenticacionService,
    private modalController: ModalController, 
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.rutinas = await this.rutinaService.getRutinasGuiadas();
    this.rutinasFiltradas = this.rutinas;
    try {
      const datos: any = await this.autenticacionService.obtenerDatosUsuario();
      this.usuarioActivo.id = datos.id || '';
      this.usuarioActivo.nombre = datos.nombre || '';
      this.usuarioActivo.email = datos.email || '';
      console.log('Usuario autenticado:', this.usuarioActivo);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
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

  async abrirModalComentario(rutinaId: string) {
    this.rutinaSeleccionadaId = rutinaId;

    const modal = await this.modalController.create({
      component: ComentarioModalComponent,
    });

    await modal.present();

    const result = await modal.onWillDismiss();
    if (result.data?.contenido) {
      await this.guardarComentario(result.data.contenido);
    }
  }

  async guardarComentario(contenido: string) {
  if (!this.usuarioActivo.id) {
    const toast = await this.toastController.create({
      message: 'Debes estar autenticado para poder comentar.',
      duration: 3000,
      position: 'top',
      color: 'danger'  // Puedes usar 'success', 'warning', 'danger', etc.
    });
    await toast.present();
    return;
  }

    if (!contenido || contenido.trim() === '') {
    const toast = await this.toastController.create({
      message: 'El contenido del comentario no puede estar vacío.',
      duration: 3000,
      position: 'top',
      color: 'danger'  // Puedes usar 'success', 'warning', 'danger', etc.
    });
    await toast.present();
    return;
  }

  

    const comentario: ComentarioI = {
      id: this.firestoreService.createIdDoc(),
      contenido,
      fechaPublicacion: new Timestamp(Date.now() / 1000, 0),
      usuario_id: this.usuarioActivo.id,
      rutina_id: this.rutinaSeleccionadaId
    };

    try {
      await this.firestoreService.createDocumentID(comentario, 'comentarios', comentario.id);
      console.log('Comentario guardado:', comentario);
    } catch (error) {
      console.error('Error al guardar el comentario en Firestore:', error);
    }
  }

  filtrarPorTipo(event: any) {
  const tipoSeleccionado = event.detail.value;

  this.filtroTipo = tipoSeleccionado;

  this.rutinasFiltradas = this.rutinas.filter(rutina =>
    rutina.tipo.toLowerCase() === tipoSeleccionado.toLowerCase()
  );
}

  empezarRutina(rutina_id: string) { 
// Navegamos a una pagina que gestiona la rutina 
  console.log('empezamos la rutina' + rutina_id  );
   this.navigationService.comienzaRutinaGuiada(rutina_id);
}



  
}
