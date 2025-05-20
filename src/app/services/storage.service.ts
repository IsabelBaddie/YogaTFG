import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ //  decorador Injectable para que este servicio pueda ser inyectado en otros componentes o servicios
  providedIn: 'root' // singleton global, disponible en toda la aplicación sin necesidad de registrarlo en providers
})
export class StorageService {
  private _storage: Storage | null = null; 
  // Inicializamos en como null para evitar errores de acceso a propiedades de un objeto no inicializado, lo creamos en el init

  constructor(private storage: Storage) {
    this.init(); // Llamamos al método init en el constructor para inicializar el almacenamiento
  }

  async init() {
    const storage = await this.storage.create(); // Creamos la instancia de almacenamiento
    this._storage = storage; // Asignamos la instancia creada a la variable _storage
  }

  async set(key: string, value: any): Promise<void> { // Método para guardar un valor en el almacenamiento mediante una clave
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> { // Método para obtener un valor del almacenamiento mediante una clave
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<void> { // Método para eliminar un valor del almacenamiento mediante una clave
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> { // Método para limpiar todo el almacenamiento
    await this._storage?.clear();
  }
}
