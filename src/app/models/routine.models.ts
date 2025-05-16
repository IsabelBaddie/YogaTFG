import { Timestamp } from "firebase/firestore";

export enum Dificultad {
  Facil = "fácil",
  Media = "media",
  Dificil = "difícil"
}

export enum Tipo {
  Fuerza = "fuerza",
  Relajacion = "relajacion",
  Flexibilidad = "flexibilidad"
}


export interface RoutineI {
    id: string;
    nombre: string;
    dificultad: Dificultad;
    duracion: number | null; 
    fechaCreacion: Date | null;
    tipo: Tipo; 
    imagenUrl?: string;
    esGuiada: boolean; 
  }
  