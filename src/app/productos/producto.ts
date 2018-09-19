export class Producto {
  id: number;
  name: string;

  imagen:string;
  alternativaMoneda:string[];
  alternativaProducto:string[];
  ofertas:Oferta[];
};

class Oferta{
    titulo:string;
    moneda: string;
    producto: string;
    precio: number;
    plataforma: string;
    link:string;
};
