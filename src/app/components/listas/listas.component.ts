import { Component, OnInit, Input } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;
  wishesList: Lista[] = [];
  constructor(public wishesService: WishesService, private router: Router) {
    this.wishesList = this.wishesService.wishesList;
  }

  ngOnInit() { }
  listaSelecionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }
  borrarLista(lista: Lista) {
    this.wishesService.borrarLista(lista);
    this.wishesList = this.wishesService.wishesList;
  }
}
