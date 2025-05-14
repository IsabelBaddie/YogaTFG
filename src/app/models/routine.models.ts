import { Timestamp } from "firebase/firestore";

export enum Dificultad {
  Facil = "fácil",
  Media = "media",
  Dificil = "difícil"
}

export interface RoutineI {
    id: string;
    nombre: string;
    dificultad: Dificultad;
    duracion: number; 
    puntuacion: number | null;
    numeroValoraciones: number | null;
    media: number | null;
    fechaCreacion: Date | null;
    tipo: string | null; 
    imagenUrl?: string;
  }
  