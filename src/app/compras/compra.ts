import { Producto } from '../productos/producto';
export class Compra {
  id: number;
  mail: string;
  nombre: string;
  producto: Producto;
  comentario: string;
  pais: string;
}