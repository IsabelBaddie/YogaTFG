import { Comentario } from "./Comentario";
import { Rutina } from "./Rutina";
import { Valoracion } from "./Valoracion";

export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public password: string,
        // 1 Usuario → N Comentarios
        comentarios: Comentario[] = [],
        // 1 Usuario → N Valoraciones
        valoraciones: Valoracion[] = [],
        // N:M Usuario ↔ Rutina (rutinas creadas o guardadas por el usuario)
        rutinas: Rutina[] = [],
    ) { }
}