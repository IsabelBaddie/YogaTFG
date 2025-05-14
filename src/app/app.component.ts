import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { PosturasService } from './services/posturas.service';
import { CategoriasService } from './services/categorias.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private posturasService = inject(PosturasService);
  private categoriaService = inject(CategoriasService);

  constructor() {
    this.initializeApp();
  }

  // Función para inicializar la app
  private async initializeApp() {
    // Verificamos si las posturas ya están en la base de datos
    const posturasExistentes = await this.posturasService.getPosturas();
    if (posturasExistentes.length === 0) {
      // Si no existen, agregamos las posturas
      this.posturasService.addPosturas();
    }

    // Verificamos si las categorías ya están en la base de datos
    const categoriasExistentes = await this.categoriaService.getCategorias();
    if (categoriasExistentes.length === 0) {
      // Si no existen, agregamos las categorías
      this.categoriaService.addCategorias();
    }
  }
}
