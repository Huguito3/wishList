import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  wishesList: Lista[] = [];

  constructor() {
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');
    // this.wishesList.push(lista1, lista2);
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.wishesList.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }
  obtenerList(id: string | number) {
    id = Number(id);
    return this.wishesList.find(listaData =>  listaData.id === id);
  }
  guardarStorage() {
    // uso el JSON stringify para guardarlo como string.
    localStorage.setItem('data', JSON.stringify(this.wishesList));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.wishesList = JSON.parse(localStorage.getItem('data'));
    } else {
      this.wishesList = [];
    }
  }
}
