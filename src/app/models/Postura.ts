import { Categoria } from "./Categoria";
import { Rutina } from "./Rutina";

export class Postura {
    constructor(
        public id: number,
        public nombre: string,
        public dificultad: string,
        public imagenUrl: string,
        public videoUrl: string,
        // 1 Postura → 1 Categoria
        categoria: Categoria,
        // N:M Postura ↔ Rutina
        rutinas: Rutina[] = [],
    ) { }
}