import { Injectable } from '@angular/core';
import { Producto } from './productos/producto';
import { PRODUCTOS } from './productos/mock-productos';
import { Observable, of } from 'rxjs';
// import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() {
      console.log("PRODUCTOS");
      console.log(PRODUCTOS);
   }

  getPrdocutos(): Observable<Producto[]> {

  // console.log(this.messageService);

  // this.messageService.add('HeroService: fetched heroes');
  return of(PRODUCTOS);
}

getProducto(id: number): Observable<Producto> {
  // TODO: send the message _after_ fetching the hero
  // this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(PRODUCTOS.find(producto => producto.id === id));
}
}








