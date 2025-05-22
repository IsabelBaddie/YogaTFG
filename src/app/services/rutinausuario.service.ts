import { Injectable } from '@angular/core';
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
    const coleccionRutinaUsuario = collection(this.firestore, 'rutinausuario'); // Obtenemos la referencia a la colección de rutinas de usuario
    const q = query(coleccionRutinaUsuario, where('usuario_id', '==', usuarioId));  // Consulta para obtener solo los documentos donde el usuario_id coincide
    const rutinaUsuarioSnapshot = await getDocs(q); // Ejecutamos la consulta y obtenemos una snapshot con los documentos

    const rutinas: RoutineI[] = []; // Creamos un array para almacenar las rutinas

    for (const relacionDoc of rutinaUsuarioSnapshot.docs) { // Iteramos sobre los documentos obtenidos
      const { rutina_id } = relacionDoc.data();  // Obtenemos el ID de la rutina asociado en este documento

      if (rutina_id) { // Si existe un ID de rutina en este documento
        const coleccionRutina = doc(this.firestore, 'rutinas', rutina_id); // Obtenemos la referencia al documento de la rutina
        const rutinaSnap = await getDoc(coleccionRutina); // Obtenemos el documento de la rutina

        if (rutinaSnap.exists()) { // Si el documento de la rutina existe
          const rutinaData = rutinaSnap.data() as any; // Obtenemos los datos de la rutina

          const rutina: RoutineI = { // Creamos un objeto de rutina con los datos obtenidos
            id: rutinaSnap.id,
            ...rutinaData,
            fechaCreacion: rutinaData.fechaCreacion?.toDate?.() ?? null  // Convertimos de Timestamp Date
          };

          rutinas.push(rutina); // Agregamos la rutina al array de rutinas
        }
      }
    }
    console.log('Rutinas de usuario: ', rutinas);
    return rutinas;
  }



  // Asignar una rutina a un usuario
  async asignarRutinaAUsuario(usuarioId: string, rutinaId: string): Promise<void> {
    const coleccionRutinaUsuario = collection(this.firestore, 'rutinausuario'); // Obtenemos la referencia a la colección de rutinausuario
    console.log('Asignando rutina a usuario: ', usuarioId, 'rutina: ', rutinaId);
    await addDoc(coleccionRutinaUsuario, { // Agregamos un nuevo documento a la colección con esos datos
      usuario_id: usuarioId,
      rutina_id: rutinaId,
      fechaAsignacion: Timestamp.now().toDate() // Guardamos la fecha de asignación
    });
  }
}
