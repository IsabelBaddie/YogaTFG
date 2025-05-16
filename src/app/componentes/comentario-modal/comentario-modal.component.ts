import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentario-modal',
  templateUrl: './comentario-modal.component.html',
  styleUrls: ['./comentario-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ComentarioModalComponent implements OnInit {

  public contenido: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async cerrarModal() {
    await this.modalController.dismiss({
      contenido: this.contenido
    });
  }
}
