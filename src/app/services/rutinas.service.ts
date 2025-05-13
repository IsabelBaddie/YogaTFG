import { Injectable } from '@angular/core';
import { collection, doc, getDocs, setDoc, query, where } from '@angular/fire/firestore';
import { PosturaI } from '../models/postura.models';
import { Firestore } from '@angular/fire/firestore'
import { Dificultad, RoutineI } from '../models/routine.models';
import { PosturaRutinaI } from '../models/posturarutina.models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  constructor(private firestore: Firestore, private firestoreService: FirestoreService) { }

async getTodasLasRutinas(): Promise<RoutineI[]> {
  const coleccionRutinas = collection(this.firestore, 'Rutinas');
  const snapshot = await getDocs(coleccionRutinas);
  return snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    } as RoutineI;
  });
}


  async crearRutinasPorDefectoParaUsuario() {
    // Verificamos si ya existen rutinas por defecto
    const coleccionRutinas = collection(this.firestore, 'rutinas');
    const nombresPorDefecto = [
      "Rutina de Fuerza",
      "Rutina de Flexibilidad",
      "Rutina de Relajación"
    ];

    const rutinasExistentesQuery = query(coleccionRutinas, where('nombre', 'in', nombresPorDefecto));
    const rutinasExistentesSnapshot = await getDocs(rutinasExistentesQuery);

    if (!rutinasExistentesSnapshot.empty) {
      console.log('Las rutinas por defecto ya existen. No se crearán duplicados.');
      return;
    }

    // Definimos categorías de posturas para cada tipo de rutina
    const fuerzaCategorias = [2, 6];
    const flexibilidadCategorias = [3, 4, 5, 8];
    const relajacionCategorias = [1, 7, 9];

    const coleccionPosturas = collection(this.firestore, 'posturas');
    const querySnapshot = await getDocs(coleccionPosturas);
    const posturas = querySnapshot.docs.map(doc => doc.data() as PosturaI);

    const posturasFuerza = posturas.filter(postura => fuerzaCategorias.includes(postura.categoria_id));
    const posturasFlexibilidad = posturas.filter(postura => flexibilidadCategorias.includes(postura.categoria_id));
    const posturasRelajacion = posturas.filter(postura => relajacionCategorias.includes(postura.categoria_id));

    const rutinas = [
      { nombre: "Rutina de Fuerza", posturas: posturasFuerza, tipo: "fuerza", dificultad: Dificultad.Dificil },
      { nombre: "Rutina de Flexibilidad", posturas: posturasFlexibilidad, tipo: "flexibilidad", dificultad: Dificultad.Media },
      { nombre: "Rutina de Relajación", posturas: posturasRelajacion, tipo: "relajación", dificultad: Dificultad.Facil },
    ];

    const coleccionPosturaRutina = collection(this.firestore, 'posturarutina');

    for (const rutina of rutinas) {
      const rutinaId = this.firestoreService.createIdDoc();
      const rutinasDocRef = doc(coleccionRutinas, rutinaId);

      const rutinaData: RoutineI = {
        id: rutinaId,
        nombre: rutina.nombre,
        dificultad: rutina.dificultad,
        duracion: rutina.posturas.reduce((acc, p) => acc + p.duracion, 0),
        puntuacion: null,
        numeroValoraciones: null,
        media: null,
        fechaCreacion: new Date(),
        tipo: rutina.tipo
      };

      await setDoc(rutinasDocRef, rutinaData);

      for (const postura of rutina.posturas) {
        const posturaRutinaId = `${rutinaId}_${postura.id}`;
        const posturaRutinaDocRef = doc(coleccionPosturaRutina, posturaRutinaId);

        const posturaRutinaData: PosturaRutinaI = {
          id: posturaRutinaId,
          postura_id: postura.id,
          rutina_id: rutinaId
        };

        await setDoc(posturaRutinaDocRef, posturaRutinaData);
      }
    }
  }

}

