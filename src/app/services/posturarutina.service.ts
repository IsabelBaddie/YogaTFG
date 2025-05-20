
import { PosturaI } from '../models/postura.models';
import { collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { PosturaRutinaI } from '../models/posturarutina.models';
import { Storage } from '@ionic/storage-angular'; // 👈 Importar

@Injectable({
  providedIn: 'root'
})
export class PosturarutinaService {

  private cachePosturasGuiadas: { [rutinaId: string]: PosturaI[] } = {};
  private storage: Storage;

  constructor(private firestoreService: FirestoreService) {
    this.storage = new Storage();
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  private firestore = inject(Firestore)

  //Método que busca todas las posturas asociadas a una rutina específica. Retorna una promesa que se resuelve con un array de PosturaI.
  async getPosturasDeRutina(rutinaId: string): Promise<PosturaI[]> {
    console.log("entra en getPosturasDeRutina");
    const coleccionPosturaRutina = collection(this.firestore, 'posturarutina'); //obtenemos una colección
    const consultaQuery = query(coleccionPosturaRutina, where('rutina_id', '==', rutinaId)); //realizamos una consulta donde rutina_id del documento sea igual al parametro pasado
    const instantanea = await getDocs(consultaQuery); //realizamos una consulta que nos devuelve una instantanea con los documentos que coinciden 


    const posturas: PosturaI[] = []; //array de posturas vacío 

    for (const documentoInstantanea of instantanea.docs) { //vamos recorriendo todos los documentos de la instantanea 
      const data = documentoInstantanea.data() as PosturaRutinaI; //casteamos los datos como la interfaz 
      const documentopostura = doc(this.firestore, 'posturas', data.postura_id); //obtenemos el documento postura con el postura_id
      const posturaSnap = await getDoc(documentopostura); //leemos los datos de esa postura 
      if (posturaSnap.exists()) { //si hay datos 
        posturas.push({ id: posturaSnap.id, ...posturaSnap.data() } as PosturaI); //añadimos al array de posturas
      }
    }
    return posturas;
  }

  async getPosturasDeRutinaGuiada(rutinaId: string, esGuiada: boolean = false): Promise<PosturaI[]> {
  if (esGuiada) {
    // Primero intenta desde memoria
    if (this.cachePosturasGuiadas[rutinaId]) {
      return this.cachePosturasGuiadas[rutinaId];
    }

    // Luego intenta desde storage
    const posturasEnStorage = await this.storage.get(`posturas-guiadas-${rutinaId}`);
    if (posturasEnStorage) {
      this.cachePosturasGuiadas[rutinaId] = posturasEnStorage;
      return posturasEnStorage;
    }
  }

  // Si no hay caché, las busca de Firestore
  const posturas = await this.getPosturasDeRutina(rutinaId);

  // Y las guarda en memoria y storage
  if (esGuiada) {
    this.cachePosturasGuiadas[rutinaId] = posturas;
    await this.storage.set(`posturas-guiadas-${rutinaId}`, posturas);
  }

  return posturas;
}


  //Este método agrega una relación entre una rutina y una postura. es async, lo que significa que usa await internamente y devuelve una promesa.
  async addPosturaARutina(rutinaId: string, posturaId: string) {
    try {
      const posturasRutinaRef = collection(this.firestore, 'posturarutina'); // nombre de la colección
      await addDoc(posturasRutinaRef, {
        id: this.firestoreService.createIdDoc(), // genera un ID único para la relación
        rutina_id: rutinaId,
        postura_id: posturaId
      });
      console.log('Postura asociada correctamente');
    } catch (error) {
      console.error('Error al asociar postura a rutina:', error);
    }
  }

  async eliminarPosturaDeRutina(rutinaId: string, posturaId: string): Promise<void> {
    const posturasRutinaRef = collection(this.firestore, 'posturarutina');
    const q = query(posturasRutinaRef,
      where('rutina_id', '==', rutinaId),
      where('postura_id', '==', posturaId)
    );
    const snapshot = await getDocs(q);

    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
      console.log(`Eliminado el documento con postura ${posturaId} de rutina ${rutinaId}`);
    }
  }

}
