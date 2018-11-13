import { Component, OnInit } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService }  from '../../mensajes/mensajes.service';
import {Router} from '@angular/router';
import { Album } from '../album';
@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  //Pagination

 data:any;
 itemsCount=1;
 page:number=1;
 pageSize=50;
 collectionSize=1200;



   // Loader
  esperandoDatos:boolean=true;



  constructor(private mailService: MailService,
     private mensageService:MensajesService,
      private router: Router) { }

  ngOnInit() {
      this.GetAlbum('',1);
  }

GetAlbum(search:any,page:number){
  console.log("SetArtista");
  console.log("search: "+search);
  console.log("page: "+page);
  this.esperandoDatos=true;
  this.mailService.GetAlbum(search,page).subscribe(
  data => {
    this.data = data;
    // this.collectionSize = data.body.itemsCount;
    this.page = data.body.page;
    this.pageSize = data.body.perPage;
    // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    this.collectionSize = data.body.itemsCount;
    this.esperandoDatos=false;
    console.log(data);
    console.log('this.collectionSize: '+this.collectionSize);
    console.log('this.pageSize: '+this.pageSize);
    console.log('this.itemsCount: '+data.body.itemsCount);
    console.log('this.page: '+this.page);
  },
 error =>{
   console.log(error);
 }

  );
 }



addAlbum(){
  console.log("addAlbum");

  this.mensageService.clearAlbum();
  this.router.navigate(['./albumCrear']);
}

modificarAlbum(album:Album){

  console.log("modificarAlbum",album);

// Solo se envía el Id del formulario, para que al refrescar la página tengamos acceso a los datos desde el server
// Si le pasamos el album, al refescar deberíamos enviar nuevamente los datos buscando en el listado.

// Se limpia el album para indicar que se comienza una nueva edición del formulario
this.mensageService.clearAlbum();

  this.router.navigate(['./albumCrear/'+album.id]);


}

deleteAlbum(album:any){

  console.log("deleteAlbum",album);

  this.mailService.deleteAlbum(album).subscribe(
    data => {
      console.log(data);
     },
     error =>{
     console.log(error);
   });

}


publishAlbum(album:any){

console.log("publishAlbum",album);
 this.mensageService.setAlbum(album);
  this.router.navigate(['./publish']);
}


getAlbumByID(album_id:number){
  console.log("GetAlbumByID");
  console.log("album_id: "+album_id);

  this.mailService.getAlbumById(album_id).subscribe(
  data => {
    // this.data = data;
    // // this.collectionSize = data.body.itemsCount;
    // this.page = data.body.page;
    // this.pageSize = data.body.perPage;
    // // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    // this.collectionSize = data.body.itemsCount;
    // this.page=data.
    console.log(data);
    // console.log('this.collectionSize: '+this.collectionSize);
    // console.log('this.pageSize: '+this.pageSize);
    // console.log('this.itemsCount: '+data.body.itemsCount);
    // console.log('this.page: '+this.page);
  },
 error =>{
   console.log(error);
 }


  );
 }



GetDsps(){
  console.log("GetDsps");


  this.mailService.getDsps().subscribe(
  data => {
    // this.data = data;
    // // this.collectionSize = data.body.itemsCount;
    // this.page = data.body.page;
    // this.pageSize = data.body.perPage;
    // // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    // this.collectionSize = data.body.itemsCount;
    // this.page=data.
    console.log(data);
    // console.log('this.collectionSize: '+this.collectionSize);
    // console.log('this.pageSize: '+this.pageSize);
    // console.log('this.itemsCount: '+data.body.itemsCount);
    // console.log('this.page: '+this.page);
  },
 error =>{
   console.log(error);
 }


  );
 }



getPublishers(){
  console.log("GetDsps");


  this.mailService.getPublishers().subscribe(
  data => {

    console.log(data);

  },
 error =>{
   console.log(error);
 }


  );
 }

 getTracks(){
    console.log("getTracks");
    this.mailService.getTracks('','',1).subscribe(
          data => {
            console.log(data);
              },
         error =>{
           console.log(error);
     });
 }

getUsers(){
    console.log("getUsers");
    this.mailService.getUsers().subscribe(
          data => {
            console.log(data);
              },
         error =>{
           console.log(error);
     });
 }

GetGenres(){
  console.log("GetDsps");


  this.mailService.GetGenres().subscribe(
  data => {
    // this.data = data;
    // // this.collectionSize = data.body.itemsCount;
    // this.page = data.body.page;
    // this.pageSize = data.body.perPage;
    // // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    // this.collectionSize = data.body.itemsCount;
    // this.page=data.
    console.log(data);
    // console.log('this.collectionSize: '+this.collectionSize);
    // console.log('this.pageSize: '+this.pageSize);
    // console.log('this.itemsCount: '+data.body.itemsCount);
    // console.log('this.page: '+this.page);
  },
 error =>{
   console.log(error);
 }


  );
 }

}
