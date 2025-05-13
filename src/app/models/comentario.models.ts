import { Timestamp } from "firebase/firestore";

export interface ComentarioI {
    id: string;
    contenido: string;
    fechaPublicacion: Date | Timestamp; 
    usuario_id: string; 
    rutina_id: string; 
  }
  