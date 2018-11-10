

import { Component, OnInit } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService }  from '../../mensajes/mensajes.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

   //Pagination

 data:any;
 itemsCount=1;
 page:number=1;
 pageSize=50;
 collectionSize=1200;
  esperandoDatos:boolean=true;
  constructor(private mailService: MailService,
     private mensageService:MensajesService,
      private router: Router) { }

  ngOnInit() {
      this.getTracks();
  }

 getTracks(){
    console.log("getTracks");
     this.esperandoDatos=true;
    this.mailService.getTracks('','',1).subscribe(
          data => {

            console.log(data);
            this.data=data;
                this.page = data.body.page;
    this.pageSize = data.body.perPage;
    // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    this.collectionSize = data.body.itemsCount;
    this.esperandoDatos=false;
              },
         error =>{
           console.log(error);
     });
 }


 modificarTrack(track:any){

  console.log("modificarTrack",track);
  // this.mensageService.setAlbum(album);
  this.router.navigate(['./trackCrear']);


}

// getAlbum(,page){

// }

// getTracks(search:any,page:number){
//   console.log("SetArtista");
//   console.log("search: "+search);
//   console.log("page: "+page);
//   this.esperandoDatos=true;
//   this.mailService.GetAlbum(search,page).subscribe(
//   data => {
//     this.data = data;
//     // this.collectionSize = data.body.itemsCount;
//     this.page = data.body.page;
//     this.pageSize = data.body.perPage;
//     // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
//     this.collectionSize = data.body.itemsCount;
//     this.esperandoDatos=false;
//     console.log(data);
//     console.log('this.collectionSize: '+this.collectionSize);
//     console.log('this.pageSize: '+this.pageSize);
//     console.log('this.itemsCount: '+data.body.itemsCount);
//     console.log('this.page: '+this.page);
//   },
//  error =>{
//    console.log(error);
//  }

//   );
 // }



}
