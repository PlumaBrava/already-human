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
    dspList:any[]=[];

    dspClassList:{}={};
    dspVarList:{}={};
    dspStatusList:{}={};
    dspResponceList:{}={};
    album: Album = new Album();
      submitted = null;
      submittedMensage = null;

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
this.getDsps();
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

    if(data.body.items){
      for(let i=0;data.body.items.length>i;i++){
        this.dspStatusList[data.body.items[i].requested_dsp]=data.body.items[i].status;
        this.dspResponceList[data.body.items[i].requested_dsp]=data.body.items[i].response_at;
      }

    }
  console.log("getDistributeAlbums this.dspStatusList",this.dspStatusList);
  console.log("getDistributeAlbums this.dspResponceList",this.dspResponceList);
  },
 error =>{
   console.log("getDistributeAlbums error",error);
 }


  );
 }

 selectAllDsps(){
   this.submitted = false;
   this.error=null;
     console.log("selectAllDsps");
     console.log("selectAllDsps a" ,this.dspVarList);
     for (let i = this.dspList.length - 1; i >= 0; i--) {

      this.dspVarList[this.dspList[i]]=true;
    }
    console.log("selectAllDsps d" ,this.dspVarList);
 }

 onChangeSelection(dsp){
   this.submitted = false;
    this.error=null;
   console.log("onChangeSelection dsp",dsp);
   console.log("onChangeSelection a",this.dspVarList[dsp]);
   // this.dspVarList[dsp]=!this.dspVarList[dsp];
   //  console.log("onChangeSelection d",this.dspVarList[dsp]);
 }
 selectNoneDsps(){
   this.submitted = false;
    this.error=null;
     console.log("selectNoneDsps");
     console.log("selectNoneDsps a" ,this.dspVarList);
     for (let i = this.dspList.length - 1; i >= 0; i--) {

      this.dspVarList[this.dspList[i]]=false;
    }
    console.log("selectNoneDsps d" ,this.dspVarList);
 }

publish(){
        console.log("publish");

        let formData:FormData = new FormData();


        formData.append('album_ids',this.transformAbumId());
        formData.append('dsp',this.transformDspSelection());

        this.submitted = false;
        this.mailService.setDistributeAlbums(formData).subscribe(
              data => {
                 this.submitted = true;
                    // this.esperandoDatos=false;
                    console.log(data);

                    if (data.response.body){
                      this.submittedMensage=data.response.body;
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


        let formData:FormData = new FormData();


        formData.append('album_ids',this.transformAbumId());
        formData.append('dsp',this.transformDspSelection());

        this.submitted = false;
        this.mailService.setTackeDownAlbums(formData).subscribe(
              data => {
                 this.submitted = true;
                    // this.esperandoDatos=false;
                    console.log(data);

                    if (data.response.body){
                      this.submittedMensage=data.response.body;
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

transformDspSelection():string{
  let ar:string[]=[];
       for (let i = this.dspList.length - 1; i >= 0; i--) {
         if(this.dspVarList[this.dspList[i]]){
            ar.push(this.dspList[i]);
          }
      }
    console.log( JSON.stringify(this.dspVarList));
    console.log( JSON.stringify(ar));
    return JSON.stringify(ar);
}

transformAbumId():string{
  let ar:number[]=[];
  ar.push(this.album.id);
  console.log( JSON.stringify(ar));
  return JSON.stringify(ar);
}

getDsps(){
  console.log("GetDsps");


  this.mailService.getDsps().subscribe(
  data => {

    this.dspList=data.body;
     this.dspList.sort();
    for (let i = this.dspList.length - 1; i >= 0; i--) {
      this.dspClassList[this.dspList[i]]="dsp-item-logo-" +this.dspList[i];
      this.dspVarList[this.dspList[i]]=null;
    }

    // this.data = data;
    // // this.collectionSize = data.body.itemsCount;
    // this.page = data.body.page;
    // this.pageSize = data.body.perPage;
    // // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    // this.collectionSize = data.body.itemsCount;
    // this.page=data.
    console.log('getDsps',data);
    // console.log('this.collectionSize: '+this.collectionSize);
    // console.log('this.pageSize: '+this.pageSize);
    // console.log('this.itemsCount: '+data.body.itemsCount);
    // console.log('this.page: '+this.page);
  },
 error =>{
   console.log('getDsps error', error);
 }


  );
 }

getclass(dsp:string){
  return this.dspClassList[dsp];
}

}
