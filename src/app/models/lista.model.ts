import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    title: string;
    creadaEn: Date;
    terminadaEn: Date;
    completada: boolean;
    items: ListaItem[];
    constructor(title: string) {
        this.title = title;
        this.creadaEn = new Date();
        this.completada = false;
        this.items = [];
        // No es lo ideal. HAcerlo en BBDD service etc.
        this.id = new Date().getTime();
    }
}

