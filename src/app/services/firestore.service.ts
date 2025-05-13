import { inject, Injectable } from '@angular/core'; // @Injectable() para que el servicio pueda ser inyectado donde lo necesitemos
// Importamos funciones de Firestore para trabajar con documentos y colecciones
import { collection, collectionData, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc, deleteDoc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
//libreria para generar id aleatorios : 
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs'; // rxjs -> para usar Observables (suscripciones en tiempo real)

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);   // Inyectamos la instancia de Firestore
  constructor() { }

  getDocument<tipo>(enlace: string) { // Método para obtener un único documento
    const document = doc(this.firestore, enlace) as DocumentReference<tipo, any>; 
    return getDoc<tipo, any>(document)
  }

  //leemos coleccion, método de tipo generico. Método para obtener todos los documentos de una colección
  getCollectionChanges<tipo>(path: string): Observable<tipo[]> { //recibe como parametro el tipo de dato (en este caso UserI),
    //  el argumento path que es la la ruta/el nombre de la coleccion 

    const refcollection = collection(this.firestore, path); //recibe la biblioteca/libreria y la ruta 


    return collectionData(refcollection)  as Observable<tipo[]>; //nos devuelve un observable y le pasamos una referencia a la coleccion 
    
  }

    //nuestro crud

  createDocument(data: any, enlace: string) { // Método para crear un documento en una ruta específica
    const document = doc(this.firestore, enlace); 
    return setDoc(document, data); 
  }

  // Método para crear un documento con un ID personalizado
  createDocumentID(data: any, enlace: string, idDoc: string) { //el enlace es el nombre de la coleccion y se concatena con el id del documento
    const document = doc(this.firestore, `${enlace}/${idDoc}`); 
    return setDoc(document,data); 
  }

  createIdDoc() { // Método que genera un ID único usando uuid
    return uuidv4() //llamamos a la funcion de la libreria 
  }

  async updateDocument(data: any, enlace : string) { // Método que actualiza un documento
    const document = doc(this.firestore, enlace)
    return updateDoc(document, data)
  }

  deleteDocumentID(enlace: string, idDoc : string) {  // Método que borra un documento
    const document = doc(this.firestore, `${enlace}/${idDoc}`)
    return deleteDoc(document); 
  }

  delateDocFromRef(ref: any) {  // Métod que borra un documento directamente desde su referencia
    return deleteDoc(ref)
  }
}

