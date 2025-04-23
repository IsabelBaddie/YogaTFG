import { Rutina } from "./Rutina";
import { Usuario } from "./Usuario";

export class Comentario {
    constructor(
        public id: number,
        public texto: string,
        // 1 Comentario → 1 Usuario (autor)
        autor: Usuario,
        // 1 Comentario → 1 Rutina
        rutina: Rutina,
    ) { }
}