import { Rutina } from "./Rutina";
import { Usuario } from "./Usuario";

export class Valoracion {
    constructor(
        public id: number,
        public puntuacion: number,  //posiblemente me gustaria hacer un enum o algo que solo permita del 0 al 5 
        // 1 Valoración → 1 Usuario (autor)
        autor: Usuario,
        // 1 Valoración → 1 Rutina
        rutina: Rutina,
    ) { }
}