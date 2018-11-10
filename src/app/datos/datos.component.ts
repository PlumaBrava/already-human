import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Producto } from '../productos/producto';
import { Compra } from '../compras/compra';
import {Router} from "@angular/router";
import { ProductosService }  from '../productos.service';
import { MailService }  from '../service/mail.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
 submitted = false;
 producto: Producto = new Producto();
 compra: Compra = new Compra();
 confirmarMail: string = null;
 alternativaProductoElegido: string = 'aaa';
 alternativaMonedaElegida: string ='bbb';
 precioSeleccionado:number;
 monedaSeleccionada:string=null;
 plataformaSeleccionada:string=null;
 linkSeleccionado:string=null;
 mensajeNombreNulo:string=null;
 mensajeMailNulo:string=null;
 mensajeConfirmarMail:string=null;

  data:any;
  constructor(
  private route: ActivatedRoute,
  private productosService: ProductosService,
  private location: Location,
  private router: Router,
  private mailService: MailService,
      ) {
        console.log("datos");
          console.log(this.compra.producto);


   }

  ngOnInit() {
      this.getProducto();
  }

  getProducto(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      console.log("getProducto:"+id);

      this.productosService.getProducto(id)
        .subscribe(producto => this.producto = producto
        // console.log("producto");
        // console.log(this.producto);
            );
    };

    setSeleccionMoneda(tipoMoneda):void{
        this.alternativaMonedaElegida=tipoMoneda;
        this.setSeleccionarPrecio();

    };

     setSeleccionProducto(tipoProducto):void{
        this.alternativaProductoElegido=tipoProducto;
         this.setSeleccionarPrecio();

    };


 verificarDatosCliente():void{
     this.mensajeNombreNulo=null;
     this.mensajeMailNulo=null;
     this.mensajeConfirmarMail=null;
// this.location.back();
// this.router.navigate(['/datos'],2);
// this.router.navigateByUrl(['datos/2']);

// this.mailService.sendMessage("FF").then(data=>console.log(data);)
// .catch(error=>console.log(error););

// console.log(this.mailService.sendMessage("FF"));
// this.mailService.addHero("FF").subscribe((data) =>

//     console.log(data)
//         );

        if(this.compra.nombre==null){
            this.mensajeNombreNulo="El nombre es obligatorio";
        }
        if(this.compra.mail==null){
            this.mensajeMailNulo="Ingresa una cuenta de mail";
        }

        if(!this.validateEmail(this.compra.mail)){
            this.mensajeMailNulo="Ingresa mail válido";
        }

        if(this.confirmarMail==null){
            this.mensajeConfirmarMail="Ingresa la cuenta de mail para confirmar";
        }
        console.log("this.confirmarMail");
        console.log(this.confirmarMail===this.compra.mail);
        console.log(this.confirmarMail==this.compra.mail);

         if(!(this.confirmarMail==this.compra.mail)){
            this.mensajeConfirmarMail="las cuentas de mail son distintas";
        }

    };

EnviarMail(){
  console.log("enviar Mail");
  this.mailService.sendMessage("mensaje test").subscribe(
  data => {
    this.data = data;
    console.log(data);
  }
  )};

 EnviarAlbum(){
  console.log("EnviarAlbum");
  this.mailService.sendMessage("EnviarAlbum").subscribe(
  data => {
    this.data = data;
    console.log(data);
  });
 }

ListarAlbum(){
  console.log("ListarAlbum");
  this.mailService.ListarAlbum("ListarAlbum").subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

ListarAlbumServer(){
  console.log("ListarAlbumServer");
  this.mailService.ListarAlbumServer("ListarAlbumServer").subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

SetArtista(){
  console.log("SetArtista");
  this.mailService.SetArtista("SetArtista").subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

GetArtista(search:any,page:number){
  console.log("SetArtista");
  this.mailService.GetArtista(search,page).subscribe(

  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

 GetGenRes(){
  console.log("GetGenRes");
  this.mailService.GetGenres().subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }


validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

    setSeleccionarPrecio():void{
        if(this.alternativaProductoElegido!=null &&this.alternativaMonedaElegida!=null){
            for (var i = this.producto.ofertas.length - 1; i >= 0; i--) {
                if( this.producto.ofertas[i].moneda==this.alternativaMonedaElegida && this.producto.ofertas[i].producto==this.alternativaProductoElegido){
                       this.precioSeleccionado=this.producto.ofertas[i].precio;
                       this.monedaSeleccionada=this.producto.ofertas[i].moneda;
                       this.plataformaSeleccionada=this.producto.ofertas[i].plataforma;
                       this.linkSeleccionado=this.producto.ofertas[i].link;
                              console.log("precioSeleccionado: "+this.precioSeleccionado);
                              console.log("monedaSeleccionada: "+this.monedaSeleccionada);
                }
            }
        } else{
                        console.log("alternativaProductoElegido  Nulos: "+this.alternativaProductoElegido);
                        console.log(" alternativaMonedaElegida Nulos: "+this.alternativaMonedaElegida);
            };

    };

// Infotrack(){
//   console.log("Infotrack");
//   this.mailService.Infotrack("Infotrack").subscribe(
//   data => {
//     this.data = data;
//     console.log(data);
//   },
//  error =>{
//    console.log(error);
//  }

//   );
//  }


buscaVehiculos(){
  console.log("buscaVehiculos");
  this.mailService.buscaVehiculos().subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

 buscaVehiculosHistorico(){
  console.log("buscaVehiculosHistorico");
  this.mailService.buscaVehiculosHistorico().subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }


}


