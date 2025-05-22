import { Injectable } from '@angular/core';
import { collection, doc, getDocs, setDoc, query, where } from '@angular/fire/firestore';
import { PosturaI } from '../models/postura.models';
import { Firestore } from '@angular/fire/firestore'
import { Dificultad, RoutineI, Tipo } from '../models/routine.models';
import { PosturaRutinaI } from '../models/posturarutina.models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  // Inyectamos Firestore para hacer consultas y nuestro FirestoreService para utilidades extra
  constructor(private firestore: Firestore, private firestoreService: FirestoreService) { }

  // Obtener todas las rutinas de la colección 'rutinas'
  async getTodasLasRutinas(): Promise<RoutineI[]> {
    const coleccionRutinas = collection(this.firestore, 'rutinas');
    const snapshot = await getDocs(coleccionRutinas);
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as RoutineI;
    });
  }

  // Creamos las rutinas por defecto para un usuario (si no existen ya)
  async crearRutinasPorDefectoParaUsuario() {
    // Verificamos si ya existen rutinas por defecto
    const coleccionRutinas = collection(this.firestore, 'rutinas');
    const nombresPorDefecto = [ //Creamos un array de string con los nombres 
      "Rutina de Fuerza",
      "Rutina de Flexibilidad",
      "Rutina de Relajación"
    ];


    // Consulta para verificar si alguna rutina con esos nombres ya existe
    const rutinasExistentesQuery = query(coleccionRutinas, where('nombre', 'in', nombresPorDefecto));
    const rutinasExistentesSnapshot = await getDocs(rutinasExistentesQuery);

    if (!rutinasExistentesSnapshot.empty) { //si no esta vacío
      console.log('Las rutinas por defecto ya existen. No se crearán duplicados.');
    } 
    else {
      
      // Definimos categorías de posturas para cada tipo de rutina
      const fuerzaCategorias = [2, 6];
      const flexibilidadCategorias = [3, 4, 5, 8];
      const relajacionCategorias = [1, 7, 9];

      const coleccionPosturas = collection(this.firestore, 'posturas'); //Referencia a la colección de posturas
      const querySnapshot = await getDocs(coleccionPosturas); //Obtenemos un snapshot con todos los documentos
      const posturas = querySnapshot.docs.map(doc => doc.data() as PosturaI); //Casteamos a PosturaI

      //Filtramos las posturas dependiendo de la categoria 
      const posturasFuerza = posturas.filter(postura => fuerzaCategorias.includes(postura.categoria_id));
      const posturasFlexibilidad = posturas.filter(postura => flexibilidadCategorias.includes(postura.categoria_id));
      const posturasRelajacion = posturas.filter(postura => relajacionCategorias.includes(postura.categoria_id));

      const rutinas = [ //Definimos las rutinas
        { nombre: "Rutina de Fuerza", posturas: posturasFuerza, tipo: Tipo.Fuerza, dificultad: Dificultad.Dificil, imagen: "assets/img/fuerza.png" },
        { nombre: "Rutina de Flexibilidad", posturas: posturasFlexibilidad, tipo: Tipo.Flexibilidad, dificultad: Dificultad.Media, imagen: "assets/img/flexibilidad.png" },
        { nombre: "Rutina de Relajación", posturas: posturasRelajacion, tipo: Tipo.Relajacion, dificultad: Dificultad.Facil, imagen: "assets/img/relajacion.png" },
      ];

      const coleccionPosturaRutina = collection(this.firestore, 'posturarutina'); //Referencia a la colección posturarutina, colección intermedia

      for (const rutina of rutinas) { //Por cada rutina 
        const rutinaId = this.firestoreService.createIdDoc(); //Usamos nuestro servicio de Firebase para el id
        const rutinasDocRef = doc(coleccionRutinas, rutinaId); //Referencia al documento de rutinas

        const rutinaData: RoutineI = { //Construimos un objeto RoutineI con los datos de la rutina a guardar
          id: rutinaId,
          nombre: rutina.nombre,
          dificultad: rutina.dificultad,
          duracion: rutina.posturas.reduce((acc, p) => acc + p.duracion, 0),
          fechaCreacion: new Date(),
          tipo: rutina.tipo,
          imagenUrl: rutina.imagen,
          esGuiada: true,
        };

        await setDoc(rutinasDocRef, rutinaData); //Guardamos el documento de la rutina

        for (const postura of rutina.posturas) { //recorremos todas las posturas de la rutina
          const posturaRutinaId = `${rutinaId}_${postura.id}`; //Definimos id
          const posturaRutinaDocRef = doc(coleccionPosturaRutina, posturaRutinaId); //Referencia al documento posturarutina

          const posturaRutinaData: PosturaRutinaI = { //Construimos el objeto PosturaRutinaI
            id: posturaRutinaId,
            postura_id: postura.id,
            rutina_id: rutinaId
          };

          await setDoc(posturaRutinaDocRef, posturaRutinaData); //Guardamos en Firebase
        }
      }
    }

  }

  // Obtener las rutinas asociadas a un usuario
  async getRutinasGuiadas(): Promise<RoutineI[]> {
    const rutinasRef = collection(this.firestore, 'rutinas'); //Referencia a la colección de rutinas
    const q = query(rutinasRef, where('esGuiada', '==', true)); //Si cumple con la condición de esGuiada == true, bandera creada para filtrar
    const rutinasSnapshot = await getDocs(q); //Ejecutamos la consulta y obtenemos una instantanea con los documentos

    const rutinas: RoutineI[] = rutinasSnapshot.docs.map(doc => {  // Convertimos los documentos en array de rutinas, añadiendo el id del documento
      const data = doc.data() as Omit<RoutineI, 'id'>;
      return { ...data, id: doc.id };
    });

    return rutinas;
  }


}

