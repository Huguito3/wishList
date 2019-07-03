import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  wishesList: Lista[] = [];
  constructor(public wishesService: WishesService, private router: Router, public alertController: AlertController) {
    //this.wishesList = this.wishesService.wishesList;
  }
  async agregarLista() {
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('canclear')
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            const listId = this.wishesService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
          }
        }
      ]
    });

    await alert.present();
  }

  // listaSelecionada(lista: Lista) {
  //   this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  // }
}
