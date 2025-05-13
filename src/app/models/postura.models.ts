export enum Dificultad {
    Facil = "fácil",
    Media = "media",
    Dificil = "difícil"
  }
  
export interface PosturaI {
    id: string;
    imagen: string; 
    postura: string;
    video: string;
    duracion: number; 
    dificultad: Dificultad;
    categoria_id: number; 
  }
  