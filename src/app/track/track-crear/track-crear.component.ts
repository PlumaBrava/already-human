import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { MensajesService }  from '../../mensajes/mensajes.service';
import { NgbDropdownModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
// import { DomSanitizer } from '@angular/platform-browser';
import { Track } from '../track';
import { Album } from '../../album/album';
import { Artista } from '../../artistas/artista';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-track-crear',
  templateUrl: './track-crear.component.html',
  styleUrls: ['./track-crear.component.css']
})
export class TrackCrearComponent implements OnInit {

file: File;
track: Track = new Track();
album: Album = new Album();
artist:Artista= new Artista();
  submitted = false;
  error=null;
//Maximo tamaño del archivo permitido
  MaxSizeFile:number=100000000000000;
  Type1_File:string= "audio/wav";
  Type2_File:string= "audio/flac";
  errorFile:string= "";

crearTrackForm = this.fb.group({
  title: ['', Validators.required],
  album_id: [''],
  explicit: [''],
  disc_number: ['',Validators.required],
  position: ['',Validators.required],
  isrc: [''],
  artist_id: [{value: '', disabled: true}],
  track_language: [''],
  composer: [''],
  additional_artists: [''],
  label_track_id: [''],
  cover_song: [''],
  track: [''],


});

//   id: number;

// title:string;
// track:   File;
// album_id: number;            //     formData    int
// explicit:  number;           //      formData    int , x ∈ { 0 , 1 }
// disc_number:number;          //        formData    int
// position: number;                //       formData    int
// isrc:string;                    //        formData    string (US-NNN-YY-DDDDD [will be generated if not provided])
// artist_id:string;                //        formData    int (will be taken from album if not provided)
// track_language: string;        //       formData    string
// composer:string;                //        formData    string
// additional_artists: string;    //       formData    string
// label_track_id:string;        //        formData    string
// cover_song:number;            //        formData    int , x ∈ { 0 , 1 }



esperandoDatos:boolean=false;


  percentDone: number;
  uploadSuccess: boolean;
  size:any;
  width:number;
  height:number;
  fileName:string;


  constructor(    //private domSanitizer: DomSanitizer,
                  private mailService: MailService,
                  private fb: FormBuilder,
                  private mensageService:MensajesService,
                  private router: Router
            ) { }

  ngOnInit() {


      // this.mensageService.getTrackObs().subscribe(
      //    data => {
      //         console.log('getTrackObs data',data);
      //        this.track=data;
      //        // this.track.album_id=this.data.id;
      //        this.track.artist_id=this.album.id;

      //       },
      //    error =>{

      //        console.log('getTrackObs error',error);
      //        this.esperandoDatos=false;

      //       }


      //   );
    this.track=this.mensageService.getTrack();
    console.log("track: ", this.track);

    // this.mensageService.getArtitaObs().subscribe( data => {
    //           console.log('getArtitaObs data',data);

    //          this.track.artist_id=data.id;
    //          this.track.artist_name=data.name;

    //      //    },
    //      // error =>{

    //      //     console.log('getTrackObs error',error);
    //      //     this.esperandoDatos=false;

    //         }
    //      )
this.album=this.mensageService.getAlbum();
console.log("album: ", this.album);

    this.artist=this.mensageService.getArtista();
    console.log("artist: ", this.artist);



       // this.mensageService.getAlbumObs().subscribe(
       //    data => {
       //        console.log('getAlbumObs data',data);
       //       this.album=data;
       //       this.track.album_id=this.album.id;

       //      },
       //    error =>{

       //       console.log('getAlbumObs error',error);
       //       this.esperandoDatos=false;

       //      if (error.message){
       //        this.error=error.message;
       //      }
       //      });

      if(this.track.id!=null){ // track Existente
             console.log(' track Existente',this.track);

          this.getArtistaById(this.track.artist_id);

      }else{
     console.log('track nuevo');
this.track.artist_id=this.album.artist_id;
this.getArtistaById(this.track.artist_id);
      }
this.crearTrackForm.patchValue(this.track);
  }


fileChange(event) {
     console.log('fileChange');
     let fileList: FileList = event.target.files;
     if(fileList.length > 0) {
       this.file= fileList[0];
       console.log('this.file',this.file);
       let fileSize:number=fileList[0].size;
       console.log('fileSize: '+fileSize);
   }





  this.percentDone = 100;
   this.uploadSuccess = true;
   let trackFile:any = event.target.files[0];
   this.size = trackFile.size;
   this.fileName = trackFile.name;

   this.verifyAudioFile(this.file);

    // WAV, FLAC
   let fr = new FileReader;
   fr.onload = () => { // when file has loaded
    var img = new Image();

    img.onload = () => {
        this.width = img.width;
        this.height = img.height;
    };

// console.log( "fr.result", fr.result);


    // img.src = window.URL ; // This is the data URL
    // img.src = Url.  createObjectURL(fr.result); // This is the data URL
    // img.src =; // This is the data URL

    // img.src =this.domSanitizer.bypassSecurityTrustUrl(image);
    // img.src = this.domSanitizer.bypassSecurityTrustResourceUrl(fr.result);
                 // + toReturnImage.base64string);



    // img.set = fr.result; // This is the data URL
};

  fr.readAsDataURL(trackFile);
   this.crearTrackForm.value.track = "";
  }

verifyAudioFile(file:File):boolean{
    let verify:boolean=true;
    if (!file.name){
        this.errorFile='File whithout name';
        verify=false;
    }
    if (file.size>this.MaxSizeFile){
        this.errorFile='File max size is:'+this.MaxSizeFile;
        verify=false;
    }
    if (file.type === this.Type1_File){
        verify=true;
    } else if (file.type === this.Type2_File){
        verify=true;
    } else {
        this.errorFile=this.errorFile+'\nFile Type is not: ('+this.Type1_File+' - ' +this.Type2_File+' )';
        +this.MaxSizeFile;
        verify=false;
    }

    return verify;

}

onSubmita() {
  // TODO: Use EventEmitter with form value
  console.warn(this.crearTrackForm.value);
  console.warn('title',this.crearTrackForm.value.title);
  console.warn('file',this.file);
  console.warn('isrc',this.crearTrackForm.value.isrc);
  this.error+null;

  let formData:FormData = new FormData();

        formData.append('title',this.crearTrackForm.value.title);
        formData.append('album_id',String(this.album.id));
        formData.append('track',this.file);
         // formData.append('album_id',this.crearTrackForm.value.album_id);
        if(this.crearTrackForm.value.explicit){
            formData.append('explicit','1');
            } else
              {formData.append('explicit','0');
            }

        formData.append('disc_number',this.crearTrackForm.value.disc_number);
        formData.append('position',this.crearTrackForm.value.position);
        if(this.crearTrackForm.value.isrc!=""){
            formData.append('isrc',this.crearTrackForm.value.isrc);
        } if(this.crearTrackForm.value.isrc!=""){
            formData.append('artist_id',this.crearTrackForm.value.artist_id);
        } if(this.crearTrackForm.value.isrc!=""){
            formData.append('track_language',this.crearTrackForm.value.track_language);
        } if(this.crearTrackForm.value.isrc!=""){
            formData.append('composer',this.crearTrackForm.value.composer);
        } if(this.crearTrackForm.value.isrc!=""){
            formData.append('additional_artists',this.crearTrackForm.value.additional_artists);
        } if(this.crearTrackForm.value.isrc!=""){
            formData.append('label_track_id',this.crearTrackForm.value.label_track_id);
        }
        if(this.crearTrackForm.value.cover_song){
            formData.append('cover_song','1');
          } else
              {formData.append('cover_song','0');
          }

    this.esperandoDatos=true;

   if(this.track.id==null) {
       this.mailService.setTrack(formData).subscribe(
              data => {
                 // this.submitted = true;
                    this.esperandoDatos=false;
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

   } else {

        formData.append('id',String(this.track.id));
        this.mailService.updateTrack(formData).subscribe(
              data => {
                 // this.submitted = true;
                    this.esperandoDatos=false;
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

}

// LLamadas a otros componentes

buscarArtista(){
  this.grabaFormulario();
   this.mensageService.clearArtistaList();
   this.router.navigate(['./artistasList']);
}



// graba el formunlario en un servicio para recuperarlo luego de un proceso.
// ej, seleecionar un artista.
grabaFormulario(){

  console.log(this.crearTrackForm);


  this.track.title=this.crearTrackForm.value.title,
  this.track.album_id=this.crearTrackForm.value.album_id,
  this.track.explicit=this.crearTrackForm.value.explicit,
  this.track.disc_number=this.crearTrackForm.value.disc_number,
  this.track.position=this.crearTrackForm.value.position,
  this.track.isrc=this.crearTrackForm.value.isrc,
  this.track.artist_id=this.crearTrackForm.value.artist_id,
  this.track.track_language=this.crearTrackForm.value.track_language,
  this.track.composer=this.crearTrackForm.value.composer,
  this.track.additional_artists=this.crearTrackForm.value.additional_artists,
  this.track.label_track_id=this.crearTrackForm.value.label_track_id,
  this.track.artist_name=this.crearTrackForm.value.artist_name,
  this.track.cover_song=this.crearTrackForm.value.cover_song,






  // todo: grabar file
  this.mensageService.setTrack(this.track);
}

getArtistaById(id:any){
  console.log("getArtistaById");
  console.log("id: "+id);
  // this.esperandoDatos=true;
  this.mailService.GetArtistaById(id).subscribe(
  data => {
       console.log(data);


    this.track.artist_name=data.body.name;

  },
 error =>{
   console.log("getArtistaById error",error);
 }

  );
 }




} // End
