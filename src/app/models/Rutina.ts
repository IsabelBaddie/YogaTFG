// src/app/models/rutina.model.ts
import { Comentario } from './Comentario';
import { Postura }    from './Postura';
import { Usuario }    from './Usuario';
import { Valoracion } from './Valoracion';

export class Rutina {
  constructor(
    public id: number,
    public nombre: string,
    public duracion: number,     // minutos  
    public dificultad: string,
    public media: number,
    public fechaCreacion: Date,
    public vecesUsada: number,

    // Ahora sí son propiedades de clase
    public posturas: Postura[]      = [],
    public comentarios: Comentario[] = [],
    public valoraciones: Valoracion[] = [],
    public usuarios: Usuario[]      = [],
  ) { }
}
