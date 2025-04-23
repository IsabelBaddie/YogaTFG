import { Postura } from "./Postura";

export class Categoria {
    constructor(
        public id: number,
        public nombre: string,
        public beneficios: string,
        public contraindicaciones: string,
        // 1 Categoria → N Posturas
        posturas: Postura[] = [],
    ) { }
}