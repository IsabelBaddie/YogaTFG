import { Injectable } from '@angular/core';
// 🔁 CORRECTO
import { Firestore, collection, doc, getDoc, getDocs, query, where, addDoc } from '@angular/fire/firestore';

import { RoutineI } from '../models/routine.models';

import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RutinausuarioService {

  constructor(private firestore: Firestore) { }

  // Obtener las rutinas asociadas a un usuario
  async getRutinasDeUsuario(usuarioId: string): Promise<RoutineI[]> {
    const relacionesRef = collection(this.firestore, 'rutinausuario');
    const q = query(relacionesRef, where('usuario_id', '==', usuarioId));
    const relacionesSnapshot = await getDocs(q);

    const rutinas: RoutineI[] = [];

    for (const relacionDoc of relacionesSnapshot.docs) {
      const { rutina_id } = relacionDoc.data();

      if (rutina_id) {
        const rutinaRef = doc(this.firestore, 'rutinas', rutina_id);
        const rutinaSnap = await getDoc(rutinaRef);

        if (rutinaSnap.exists()) {
          const rutinaData = rutinaSnap.data() as any;

          const rutina: RoutineI = {
            id: rutinaSnap.id,
            ...rutinaData,
            fechaCreacion: rutinaData.fechaCreacion?.toDate?.() ?? null  // ✅ aquí haces la conversión segura
          };

          rutinas.push(rutina);
        }
      }
    }
    console.log('Rutinas de usuario: ', rutinas);
    return rutinas;
  }



  // Asignar una rutina a un usuario
  async asignarRutinaAUsuario(usuarioId: string, rutinaId: string): Promise<void> {
    const relacionesRef = collection(this.firestore, 'rutinausuario');
    console.log('Asignando rutina a usuario: ', usuarioId, 'rutina: ', rutinaId);
    await addDoc(relacionesRef, {
      usuario_id: usuarioId,
      rutina_id: rutinaId,
      fechaAsignacion: Timestamp.now().toDate() // Guardamos la fecha de asignación
    });
  }
}
