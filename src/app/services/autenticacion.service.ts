import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { FirestoreService } from '../services/firestore.service'; //SERVICIO
import { Storage } from '@ionic/storage-angular'; //ALMACENAMIENTO
import { UserI } from '../models/user.models'; //MODELO
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private db: Firestore; //propiedad privada db para manejar la instancia de Firestore que se usará para acceder a los datos de los usuarios

  constructor( // Constructor de la clase que inyecta los servicios necesarios
    private auth: Auth,
    private firestoreService: FirestoreService,
    private storage: Storage
  ) {
    this.db = getFirestore(); // Inicializamos Firestore y lo asignamos a nuestra propiedad db
  }

  // Método de inicio de sesión
  signIn(email: string, password: string) {
    // Llamamos a la función signInWithEmailAndPassword de Firebase Auth para autenticar al usuario
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  // Método de registro
  register(user: { email: string; password: string }) {
    // Llamamos a la función createUserWithEmailAndPassword de Firebase Auth para crear un nuevo usuario
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Método de cierre de sesión
  logout() {
    // Llamamos a la función signOut de Firebase Auth para cerrar la sesión del usuario
    return signOut(this.auth);
  }

  // Escucha los cambios de estado del usuario autenticado
  onAuthStateChanged(callback: (user: UserI | null) => void) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) { //si tenemos usuario creamos un usuario de tipo UserI con los datos del usuario autenticado
        const userI: UserI = {
          id: user.uid,
          nombre: user.displayName || '',
          email: user.email || '',
          password: '', // Firebase no proporciona la contraseña
        };
        callback(userI);
      } else {
        callback(null);
      }
    });
  }
  
  async obtenerDatosUsuario(): Promise<UserI> {
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const docRef = doc(this.db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserI; //Casteamos para poder devolverlo como UserI
      } else {
        throw new Error('No se encontró el documento del usuario.');
      }
    } else {
      throw new Error('No hay usuario autenticado.');
    }
  }

}
