import { Component, OnInit } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';
  constructor(private wishService: WishesService, private router: ActivatedRoute) {
    const ListaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.wishService.obtenerList(ListaId);
  }

  ngOnInit() {
  }
  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.wishService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    this.wishService.guardarStorage();
  }

  borrar(i: number) {
    // desde que posicion quiero borrar y cuantos
    this.lista.items.splice(i, 1);
    this.wishService.guardarStorage();
  }

}
