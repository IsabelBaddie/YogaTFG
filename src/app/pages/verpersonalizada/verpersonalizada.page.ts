import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PosturarutinaService } from 'src/app/services/posturarutina.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PosturaI } from 'src/app/models/postura.models';

import { ActivatedRoute } from '@angular/router';

import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser'; // Para poder insertar URLs de forma segura (YouTube embed)
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PosturasModalComponent } from 'src/app/componentes/posturas-modal/posturas-modal.component';


@Component({
  selector: 'app-verpersonalizada',
  templateUrl: './verpersonalizada.page.html',
  styleUrls: ['./verpersonalizada.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule
  ]
})


export class VerpersonalizadaPage implements OnInit {

  //VARIABLES DEL COMPONENTE
  posturasDeLaRutina: PosturaI[] = []; // Posturas asociadas a la rutina actual
  todasLasPosturas: PosturaI[] = []; // Todas las posturas disponibles en la base de datos
  posturasSeleccionadasId: { [key: string]: string } = {}; // Diccionario para seleccionar posturas por rutina
  //Siendo la key la rutina y el valor el id de la postura
  public rutinaId: string = ''; // ID de la rutina que obtenemos desde la URL
  
  filtroPosturas: string = '';
  posturaSeleccionada: PosturaI | null = null;

  constructor(
    private posturaRutinaService: PosturarutinaService,
    private navigationService: NavigationService,
    private route: ActivatedRoute, // para leer rutinaId
    private firestore: Firestore,
    public sanitizer: DomSanitizer,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtenemos el ID de la rutina desde la URL

    if (id) {
      this.rutinaId = id; // Guardamos el id para que esté accesible siempre
      await this.cargarTodasLasPosturas(); //Cargamos todas las posturas disponibles para que el usuario luego pueda añadir
      await this.verPosturasDeRutina(this.rutinaId); //Cargamos las posturas de la rutina
    } else {
      console.error("No se proporcionó rutinaId");
    }
  }

  async verPosturasDeRutina(rutinaId: string) {
    try {
      this.posturasDeLaRutina = await this.posturaRutinaService.getPosturasDeRutina(rutinaId);
      console.log('Posturas asociadas a la rutina:', this.posturasDeLaRutina);

      for (let i in this.posturasDeLaRutina) {
        console.log("El video de la postura" + this.posturasDeLaRutina[i] + "es" + this.posturasDeLaRutina[i].video); 
      }

    } catch (error) {
      console.error('Error al obtener las posturas:', error);
    }
  }

  // Navegación común
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


  async cargarTodasLasPosturas() { //Método para obteenr todas las posturas 
    const coleccionPosturas = collection(this.firestore, 'posturas'); //Referencia a la colección de posturas
    const snapshot = await getDocs(coleccionPosturas); //Snapshot con los documentos de la colección
    this.todasLasPosturas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PosturaI[]; //Casteamos como PosturaI nuestro modelo 

    console.log('Posturas cargadas:', this.todasLasPosturas);
    console.log('Posturas con categoría_id:', this.todasLasPosturas.map(p => p.categoria_id));

  }

  async asociarPostura() { //Método que asocia la postura a la rutina 
    const posturaId = this.posturasSeleccionadasId[this.rutinaId]; //Obtenemos el id de la postura seleccionada 
    if (!posturaId || !this.rutinaId) return; //si no hay postura seleccionada o no hay rutina
    console.log('Asociando postura:', posturaId, 'a rutina:', this.rutinaId);
    await this.posturaRutinaService.addPosturaARutina(this.rutinaId, posturaId); //Usamos nuestro servicio para añadir la postura a la rutina 
    this.posturasSeleccionadasId[this.rutinaId] = ''; // Limpiamos selección
    this.verPosturasDeRutina(this.rutinaId); // Refrescamos la lista
  }

  async eliminarPostura(posturaId: string) { //Método que elimina la psotura de la rutina 
    if (!this.rutinaId) return;

    await this.posturaRutinaService.eliminarPosturaDeRutina(this.rutinaId, posturaId);
    await this.verPosturasDeRutina(this.rutinaId); // Recargamos la lista
  }

  // Convierte una URL normal de YouTube en un URL embed para mostrar el video en un <iframe>
  transformarUrlYoutube(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0]; // extrae el ID
    return `https://www.youtube.com/embed/${videoId}`;
  }

  async abrirModalPosturas() {
  const modal = await this.modalController.create({
    component: PosturasModalComponent, //La modal que se abre 
    componentProps: {
      posturas: this.todasLasPosturas //Le pasamos un array con todas las posturas a la modal 
    }
  });

  await modal.present(); //Mostramos la modal 

  const { data } = await modal.onDidDismiss<PosturaI>(); //Esperamos a que la modal se cierre y recogemos los datos
  if (data) { //Si recibimos la ostura seleccionada 
    this.posturaSeleccionada = data; //la guardamos la postura 
    
    this.posturasSeleccionadasId[this.rutinaId] = data.id; //Guardamos el id de esa postura asociada a esta rutina
  }
}



}
