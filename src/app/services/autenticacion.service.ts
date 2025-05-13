import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { FirestoreService } from '../services/firestore.service'; 
import { Storage } from '@ionic/storage-angular'; 
import { UserI } from '../models/user.models'; 
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private db: Firestore;

  constructor(
    private auth: Auth,
    private firestoreService: FirestoreService,
    private storage: Storage // Inyectamos Storage
  ) { 
    this.db = getFirestore(); // Inicializa Firestore
  }

  // Método de registro
  register(user: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Método de inicio de sesión
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método de cierre de sesión
  logout() {
    return signOut(this.auth);
  }


  // Verificar si hay un usuario autenticado
  onAuthStateChanged(callback: (user: UserI | null) => void) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
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

  async obtenerDatosUsuario() {
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const docRef = doc(this.db, 'Usuarios', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('No se encontró el documento del usuario.');
      }
    } else {
      throw new Error('No hay usuario autenticado.');
    }
  }

}
