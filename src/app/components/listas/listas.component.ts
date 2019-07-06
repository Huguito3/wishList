import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;
  wishesList: Lista[] = [];
  constructor(public wishesService: WishesService, private router: Router, private alertController: AlertController) {
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

  async editarLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { this.lista.closeSlidingItems(); }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            lista.title = data.titulo;
            this.wishesService.guardarStorage();
            this.wishesList = this.wishesService.wishesList;
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();
  }
}
