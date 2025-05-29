import { PosturaI } from '../models/postura.models';
import { collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { PosturaRutinaI } from '../models/posturarutina.models';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PosturarutinaService {

  //Variables
  private cachePosturasGuiadas: { [rutinaId: string]: PosturaI[] } = {}; // Caché en memoria para rutinas guiadas
  private storage: Storage; // Variable para manejar el almacenamiento local

  constructor(private firestoreService: FirestoreService) { // Inyectamos el servicio FirestoreService
    this.storage = new Storage(); // Inicializamos el almacenamiento local
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create(); //Creamos una instancia del Storage
  }

  private firestore = inject(Firestore)

  //Método que busca todas las posturas asociadas a una rutina. Retorna una promesa que se resuelve con un array de PosturaI.
  async getPosturasDeRutina(rutinaId: string): Promise<PosturaI[]> {
    console.log("entra en getPosturasDeRutina");
    const coleccionPosturaRutina = collection(this.firestore, 'posturarutina'); //Obtenemos la colección posturarutina
    const consultaQuery = query(coleccionPosturaRutina, where('rutina_id', '==', rutinaId)); //Realizamos una consulta donde rutina_id del documento sea igual al parametro rutinaId
    const instantanea = await getDocs(consultaQuery); //Ejecutamos la consulta que nos devuelve una instantanea con los documentos que coinciden 


    const posturas: PosturaI[] = []; //Array de posturas vacío para luego almacenar

    for (const documentoInstantanea of instantanea.docs) { //Vamos recorriendo todos los documentos de la instantanea 
      const data = documentoInstantanea.data() as PosturaRutinaI; //Casteamos los datos como el modelo PosturaRutinaI
      //doc(firestore, 'nombre_colección', 'id_documento')
      const documentopostura = doc(this.firestore, 'posturas', data.postura_id); //Obtenemos el documento postura con el postura_id
      const posturaSnap = await getDoc(documentopostura); //Leemos los datos de esa postura 
      if (posturaSnap.exists()) { //Si hay datos 
        posturas.push({ id: posturaSnap.id, ...posturaSnap.data() } as PosturaI); //añadimos al array de posturas casteando el id y los datos de la postura
      }
    }
    return posturas;
  }

  async getPosturasDeRutinaGuiada(rutinaId: string, esGuiada: boolean = false): Promise<PosturaI[]> {
    if (esGuiada) { // Si es guiada, intentamos obtener las posturas de la caché
      if (this.cachePosturasGuiadas[rutinaId]) { // Si ya está en memoria
        return this.cachePosturasGuiadas[rutinaId]; //Devolvemos las posturas de memoria
      }
      else { // Si no está en memoria, intenta obtenerlas de storage 
        const posturasEnStorage = await this.storage.get(`posturas-guiadas-${rutinaId}`);
        if (posturasEnStorage) {
          this.cachePosturasGuiadas[rutinaId] = posturasEnStorage;
          return posturasEnStorage;
        }
      }
    }

    // Si no estan ni en caché ni en Storage, las buscamos de Firestore
    const posturas = await this.getPosturasDeRutina(rutinaId);

    // Y las guardamos en memoria y storage
    if (esGuiada) {
      this.cachePosturasGuiadas[rutinaId] = posturas; // Guardamos en caché
      await this.storage.set(`posturas-guiadas-${rutinaId}`, posturas); // Guardamos en storage
    }

    return posturas;
  }


  //Este método agrega una relación entre una rutina y una postura. es async, lo que significa que usa await internamente y devuelve una promesa.
  async addPosturaARutina(rutinaId: string, posturaId: string) {
    try {
      const posturasRutinaColeccion = collection(this.firestore, 'posturarutina'); // Obtenemos la colección posturarutina
      await addDoc(posturasRutinaColeccion, { //Añadimos el documento a la colección 
        id: this.firestoreService.generarIdAleatorio(), //Usamos el servicio FirestoreService para crear un id único
        rutina_id: rutinaId,
        postura_id: posturaId
      });
      console.log('Postura asociada correctamente');
    } catch (error) {
      console.error('Error al asociar postura a rutina:', error);
    }
  }

  async eliminarPosturaDeRutina(rutinaId: string, posturaId: string): Promise<void> {
    const posturasRutinaColeccion = collection(this.firestore, 'posturarutina');
    const q = query(posturasRutinaColeccion, //query para encontrar los documentos que los parametros pasados sean iguales a postura_id y rutina_id
      where('rutina_id', '==', rutinaId),
      where('postura_id', '==', posturaId)
    );
    const snapshot = await getDocs(q); //Obteneos la instantanea que tiene los documentos que cumplen la query

    for (const docSnap of snapshot.docs) { //Recorremos los documentos de la instantanea
      await deleteDoc(docSnap.ref); //Eliminamos el documento
      console.log(`Eliminado el documento con postura ${posturaId} de rutina ${rutinaId}`);
    }
  }

}
