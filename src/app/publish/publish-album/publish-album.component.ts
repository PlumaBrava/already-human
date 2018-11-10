import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { MensajesService }  from '../../mensajes/mensajes.service';
import { NgbDropdownModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { Album } from '../../album/album';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-publish-album',
  templateUrl: './publish-album.component.html',
  styleUrls: ['./publish-album.component.css']
})
export class PublishAlbumComponent implements OnInit {


    album: Album = new Album();
      submitted = false;
  error=null;
//Maximo tamaño del archivo permitido
  MaxSizeFile:number=100000000000000;
  Type1_File:string= "audio/wav";
  Type2_File:string= "audio/flac";
  errorFile:string= "";

crearDistributionForm = this.fb.group({
  twenty4seven: ['', ],
  amie: ['',],
  beatport: ['',],


});




esperandoDatos:boolean=false;


  percentDone: number;
  uploadSuccess: boolean;
  size:any;
  width:number;
  height:number;
  fileName:string;

  constructor(
       //private domSanitizer: DomSanitizer,
                  private mailService: MailService,
                  private fb: FormBuilder,
                  private mensageService:MensajesService,
                  private router: Router) { }

  ngOnInit() {
      this.album=this.mensageService.getAlbum();
console.log("album: ", this.album);
this.getPublishers();
this.getDistributeAlbums();
  }



getPublishers(){
  console.log("getPublishers");


  this.mailService.getPublishers().subscribe(
  data => {

    console.log("getPublishers",data);

  },
 error =>{
   console.log(error);
 }


  );
 }

 getDistributeAlbums(){
  console.log("getDistributeAlbums");


  this.mailService.getDistributeAlbums( null,this.album.id).subscribe(
  data => {

    console.log("getDistributeAlbums",data);

  },
 error =>{
   console.log("getDistributeAlbums error",error);
 }


  );
 }

 selectAllDsps(){
     console.log("selectAllDsps");
 }
 selectNoneDsps(){
     console.log("selectNoneDsps");
 }
publish(){
        console.log("publish");
        console.warn(this.crearDistributionForm.value);
        let formData:FormData = new FormData();


        formData.append('album_id',String(this.album.id));
        formData.append('amie',this.crearDistributionForm.value.amie);
        formData.append('beatport',this.crearDistributionForm.value.beatport);

        this.mailService.setDistributeAlbums(formData).subscribe(
              data => {
                 // this.submitted = true;
                    // this.esperandoDatos=false;
                    console.log(data);

                    if (data.response.body){
                      this.error=data.response.body;
                    }
                  },
               error =>{

                     console.log(error);
                     this.esperandoDatos=false;

                     console.log(error.message);

                   if (error.message){
                      this.error=error.message;
                    }

             });


 }
 takeDown(){
     console.log("takeDown");
 }



}
