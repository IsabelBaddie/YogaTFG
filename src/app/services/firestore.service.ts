import { inject, Injectable } from '@angular/core'; // @Injectable() para que el servicio pueda ser inyectado donde lo necesitemos
// Importamos funciones de Firestore para trabajar con documentos y colecciones
import { collection, collectionData, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc, deleteDoc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
//libreria para generar id aleatorios : 
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs'; // rxjs -> para usar Observables (suscripciones en tiempo real)

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible a nivel global 
})
export class FirestoreService {
   // Inyectamos Firestore
  constructor(private firestore: Firestore) { }

  getDocument<tipo>(rutaDocumento: string) { // Método para obtener un único documento
    const documento = doc(this.firestore, rutaDocumento) as DocumentReference<tipo, any>; //la ruta es decir nombrecoleccion/iddocumento
    return getDoc<tipo, any>(documento) 
  }

  //leemos coleccion, método de tipo generico. Método para obtener todos los documentos de una colección
  getCollectionChanges<tipo>(rutaColeccion: string): Observable<tipo[]> { //recibe como parametro el tipo de dato (en este caso UserI),
    //  el argumento path que es la la ruta/el nombre de la coleccion 

    const refcollection = collection(this.firestore, rutaColeccion); //recibe la biblioteca/libreria y la ruta 
    return collectionData(refcollection)  as Observable<tipo[]>; //nos devuelve un observable 
    
  }

  createDocument(data: any, rutaColeccion: string) { // Método para crear un documento en una ruta específica
    const document = doc(this.firestore, rutaColeccion); 
    return setDoc(document, data); 
  }

  // Método para crear un documento con un ID personalizado
  createDocumentID(data: any, rutaColeccion: string, idDoc: string) { //la rutaColeccion es el nombre de la coleccion y se concatena con el id del documento
    const document = doc(this.firestore, `${rutaColeccion}/${idDoc}`); 
    return setDoc(document,data); 
  }

  createIdDoc() { // Método que genera un ID único usando uuid
    return uuidv4() //llamamos a la funcion de la libreria 
  }

  async updateDocument(data: any, rutaColeccion : string) { // Método que actualiza un documento
    const document = doc(this.firestore, rutaColeccion)
    return updateDoc(document, data)
  }

  deleteDocumentID(rutaColeccion: string, idDoc : string) {  // Método que borra un documento
    const document = doc(this.firestore, `${rutaColeccion}/${idDoc}`)
    return deleteDoc(document); 
  }

  delateDocFromRef(ref: any) {  // Métod que borra un documento directamente desde su referencia
    return deleteDoc(ref)
  }
}

