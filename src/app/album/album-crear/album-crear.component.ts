import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { MensajesService }  from '../../mensajes/mensajes.service';
import { NgbDropdownModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Album } from '../album';
import {Router,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-album-crear',
  templateUrl: './album-crear.component.html',
  styleUrls: ['./album-crear.component.css']
})
export class AlbumCrearComponent implements OnInit {
 file: File;
 album: Album = new Album();
disckNumber:number=1;
traksNumber:number=5;
// Lista de tracks en el album
 AlbumTracks=null;


  submitted = false;
submittedMensage=null;
  error=null;



crearAlbumForm = this.fb.group({
  title: ['', Validators.required],
  fileImagen: ['',[Validators.required]],
  label_id: ['',[Validators.required]],

  artist_id: ['',[Validators.required]],
  release_date: ['', [Validators.required]],
  p_line: [''],
  p_line_yyyy: ['',[Validators.required]],
  p_line_text: ['',[Validators.required]],
  c_line: [''],
  c_line_yyyy: ['',[Validators.required]],
  c_line_text: ['',[Validators.required]],
  explicit: [''],
  upc: [''],
  genre: [''],
  album_genres: [''],
  album_territories: [''],
  language: [''],
  secondary_language: [''],

});

esperandoDatos:boolean=false;


  percentDone: number;
  uploadSuccess: boolean;
  size:any;
  width:number;
  height:number;
  fileName:string;

  @ViewChild('coverFilesInput') imgType:ElementRef;
    // crearAlbumForm = new FormGroup({
    //     title: new FormControl(''),
    //     fileImagen: new FormControl(''),
    //     label_id: new FormControl(''),
    //     release_date: new FormControl(''),
    //     p_line: new FormControl(''),
    //     c_line: new FormControl(''),
    //     explicit: new FormControl(''),
    //     upc: new FormControl(''),
    //     genre: new FormControl(''),
    //     album_genres: new FormControl(''),
    //     album_territories: new FormControl(''),
    //     language: new FormControl(''),
    //     secondary_language: new FormControl('')
    // });
  constructor(
      // private domSanitizer: DomSanitizer,
      private mailService: MailService,
      private fb: FormBuilder,
      private mensageService:MensajesService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
      // this.artista.name='Juan';
      console.log('artista Album',this.album);
       console.log('artista crear List of label',this.mensageService.getLabel());
      console.log('artista crear List of Artista',this.mensageService.getArtistaList());


       this.album=this.mensageService.getAlbum();

       if(this.album.estado==1){//En edicion

          this.poblarformulario();
      } else {
        // si no se están editando los datos se buscan los datos en server
        let id= this.route.snapshot.paramMap.get('album_id');
        console.log('album_id',id);

        this.getAlbumByID(Number(id));
      }



        this.esperandoDatos=false;






  }

// Primero se consiguen los datos del album a partir del su Id.
// Luego  puebla los datos del formulario con
//     con datos recibidos por mensajase o
//     los solicita a partir de los datos del album
poblarformulario(){
          if(this.album.id){
          this.getAlbumTracks(this.album.id);
        }

        if(this.mensageService.getLabel().length>0){
             console.log('cargo label')
             let labelaux=this.mensageService.getLabel()[0];
             this.album.label_id= +labelaux.id;
             this.album.labelName= labelaux.name;

        }
         if(this.mensageService.getArtistaList().length>0){
             console.log('cargo label');
             let artistaux=this.mensageService.getArtistaList()[0];
             this.album.artist_id= +artistaux.id;
             this.album.artistaName= artistaux.name;

        }

 console.log('artista crear List of Artista',this.album);


        if(this.album.artist_id!=null){
          console.log('getArtistaById',this.album.artist_id);
          this.getArtistaById(this.album.artist_id);
        }

  if(this.album.label_id!=null){
          console.log('label_id',this.album.label_id);
          this.getLabelById(this.album.label_id);
        }
//Transforma el string de la fecha en una fecha que pueda manejar el formulario
  if(typeof this.album.release_date == 'string'
    // || this.album.release_date instanceof String
    ){
          console.log('release_date',this.album.release_date);
          this.album.release_date= this.transfomrStringToDate(this.album.release_date);
           console.log('release_date',this.album.release_date);

        }

//Abre c_line en año y texto
if(this.album.c_line!=null){
          console.log('c_line',this.album.c_line);
          this.album.c_line_yyyy= this.transformlineToYYYY(this.album.c_line);
          this.album.c_line_text= this.transformlineTotext(this.album.c_line);
           console.log('c_line y',this.album.c_line_yyyy);
           console.log('c_line t',this.album.c_line_text);

        }

//Abre p_line en año y texto
if(this.album.p_line!=null){
          console.log('p0_line',this.album.c_line);
          this.album.p_line_yyyy= this.transformlineToYYYY(this.album.p_line);
          this.album.p_line_text= this.transformlineTotext(this.album.p_line);
           console.log('p_line y',this.album.p_line_yyyy);
           console.log('p_line t',this.album.p_line_text);

        }


//Asigna las variable al formulario.
  this.crearAlbumForm.patchValue(this.album);

}

  newAlbum(): void {
    this.submitted = false;
    this.album = new Album();
      this.crearAlbumForm.patchValue(this.album);
  }


onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.crearAlbumForm.value);
  console.warn('title',this.crearAlbumForm.value.title);
  console.warn('genre',this.crearAlbumForm.value.genre);
  console.warn('album_genres ',this.crearAlbumForm.value.album_genres );
  console.warn('file',this.file);
  this.error=null;

  let formData:FormData = new FormData();

        formData.append('title',this.crearAlbumForm.value.title);
        formData.append('label_id',this.crearAlbumForm.value.label_id);
        formData.append('artist_id',this.crearAlbumForm.value.artist_id);
        formData.append('release_date',this.trasnformDateToString(this.crearAlbumForm.value.release_date));



        formData.append('p_line',this.transformYYYY_Text_to_Line(this.crearAlbumForm.value.p_line_yyyy,this.crearAlbumForm.value.p_line_text));
        formData.append('c_line',this.transformYYYY_Text_to_Line(this.crearAlbumForm.value.c_line_yyyy,this.crearAlbumForm.value.c_line_text));

         if(this.crearAlbumForm.value.explicit){
            formData.append('explicit','1');
            } else
              {formData.append('explicit','0');
            }
        formData.append('cover',this.file);
        if(this.crearAlbumForm.value.upc!=""){
          formData.append('upc',this.crearAlbumForm.value.upc);
        }
         if(this.crearAlbumForm.value.genre!=""){
        formData.append('genre',this.crearAlbumForm.value.genre);
        }
         if(this.crearAlbumForm.value.album_genres!=""){

        formData.append('album_genres',this.transformGenres(this.crearAlbumForm.value.album_genres));
          }
          if(this.crearAlbumForm.value.album_territories!=""){
        formData.append('album_territories',  this.transformTerritory(this.crearAlbumForm.value.album_territories));
        }
         if(this.crearAlbumForm.value.language!=""){
        formData.append('language',this.crearAlbumForm.value.language);
        }

         if(this.crearAlbumForm.value.secondary_language!=""){
        formData.append('secondary_language',this.crearAlbumForm.value.secondary_language);
      }

 // console.warn(formData.get('title'));
 // console.warn(formData.get('fileImagen'));
this.esperandoDatos=true;

   this.mailService.SetAlbum(formData).subscribe(
  data => {
     this.submitted = true;
     this.esperandoDatos=false;
    console.log(data);

    if (data.response.body){
      this.submitted=data.response.body;
       this.router.navigate(['./albumCrear/'+data.response.body.id]);
    }
  },
 error =>{

     console.log(error);
     this.esperandoDatos=false;

     console.log(error.message);

   if (error.message){
      this.error=error.message;
    }

 }
)
}
  // onSubmit() {
  //   this.submitted = true;
  //   this.save();
  // }

  save() {
  //   this.mailService.SetAlbum(this.album).subscribe(
  // data => {
  //    this.submitted = true;
  //    this.error=data.body.error;
  //   console.log(data);
 //  },
 // error =>{
 //   console.log(error);
 // }

  // );;
     // this.mensajesService.changeMessage("");
    this.album = new Album();
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
   let image:any = event.target.files[0];
   this.size = image.size;
   this.fileName = image.name;
   let fr = new FileReader;
   fr.onload = () => { // when file has loaded
    var img = new Image();

    img.onload = () => {
        this.width = img.width;
        this.height = img.height;
    };

console.log( "fr.result", fr.result);


    // img.src = window.URL ; // This is the data URL
    // img.src = Url.  createObjectURL(fr.result); // This is the data URL
    // img.src =; // This is the data URL

    // img.src =this.domSanitizer.bypassSecurityTrustUrl(image);
    // img.src = this.domSanitizer.bypassSecurityTrustResourceUrl(fr.result);
                 // + toReturnImage.base64string);



    // img.set = fr.result; // This is the data URL
};

  fr.readAsDataURL(image);
   this.crearAlbumForm.value.fileImagen = "";
  }








// graba el formunlario en un servicio para recuperarlo luego de un proceso.
// ej, seleecionar un artista.



grabaFormulario(){

  this.transformYYYY_Text_to_Line(this.crearAlbumForm.value.p_line_yyyy,this.crearAlbumForm.value.p_line_text);
  this.transformYYYY_Text_to_Line(this.crearAlbumForm.value.c_line_yyyy,this.crearAlbumForm.value.c_line_text);
  console.log(this.crearAlbumForm);
  this.album.title=this.crearAlbumForm.value.title,
  // this.album.cover: this.crearAlbumForm.value.title,
  this.album. label_id= this.crearAlbumForm.value.label_id,
  this.album.artist_id=this.crearAlbumForm.value.artist_id,
  this.album. release_date= this.crearAlbumForm.value.release_date,
  this.album.p_line=this.crearAlbumForm.value.p_line,
  this.album.p_line_yyyy=this.crearAlbumForm.value.p_line_yyyy,
  this.album.p_line_text=this.crearAlbumForm.value.p_line_text,
  this.album.c_line= this.crearAlbumForm.value.c_line,
  this.album.c_line_yyyy= this.crearAlbumForm.value.c_line_yyyy,
  this.album.c_line_text= this.crearAlbumForm.value.c_line_text
  this.album.explicit=this.crearAlbumForm.value.explicit,
  this.album.upc= this.crearAlbumForm.value.upc,
  this.album.genre= this.crearAlbumForm.value.genre,
  this.album. album_genres= this.crearAlbumForm.value.album_genres,
  this.album.album_territories= this.crearAlbumForm.value.album_territories,
  this.album. language=this.crearAlbumForm.value.language,
  this.album. secondary_language=this.crearAlbumForm.value.secondary_language,

  // todo: grabar file
  this.mensageService.setAlbum(this.album);
}





getAlbumTracks(album_id){
   console.log("getAlbumTracks ");

      this.mailService.getTracks(album_id,null,1).subscribe(


       data => {

             console.log("getAlbumTracks",data);
             if(data.statusCode=200){
             this.AlbumTracks=data.body.items;
              console.log("getAlbumTracks AlbumTracks ",this.AlbumTracks);
             }


        },
       error =>{
         console.log("getAlbumTracks error",error);
       });

}



getArtistaById(id:number){
  console.log("getArtistaById");
  console.log("id: "+id);
  // this.esperandoDatos=true;
  this.mailService.GetArtistaById(id).subscribe(
  data => {
       console.log(data);


    this.album.artistaName=data.body.name;

  },
 error =>{
   console.log("getArtistaById error",error);
 }

  );
 }


 getLabelById(id:number){
  console.log("getArtistaById");
  console.log("id: "+id);
  // this.esperandoDatos=true;
  this.mailService.GetLabelById(id).subscribe(
  data => {
       console.log(data);

 this.album.labelName=data.body.name;


  },
 error =>{
   console.log("getArtistaById error",error);
 }

  );
 }




// LLamadas a otros componentes

getAlbumByID(album_id:number){
  console.log("getAlbumByID");
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
    console.log('getAlbumByID data',data);
    this.album=data.body;
    this.poblarformulario();
    // console.log('this.collectionSize: '+this.collectionSize);
    // console.log('this.pageSize: '+this.pageSize);
    // console.log('this.itemsCount: '+data.body.itemsCount);
    // console.log('this.page: '+this.page);
  },
 error =>{
   console.log('getAlbumByID error',error);
 });
}


buscarLabel(){
 this.grabaFormulario();
 this.mensageService.clearLabelList();
 // Guardamos el album para tener los datos modificados en este formulario.
 // el album se debe gurdar desde aca puesto que indicaría que se está modificando.
 this.album.estado=1; // Indica que se está editando
 this.mensageService.setAlbum(this.album);
   this.router.navigate(['./labelList']);
}
buscarArtista(){
  this.grabaFormulario();
   this.mensageService.clearArtistaList();
   // Guardamos el album para tener los datos modificados en este formulario.
 // el album se debe gurdar desde aca puesto que indicaría que se está modificando.
 this.album.estado=1; // Indica que se está editando
 this.mensageService.setAlbum(this.album);
   this.router.navigate(['./artistasList']);
}


addTrack(album:Album){
  this.mensageService.clearTrack();
  this.mensageService.clearArtista()
  this.mensageService.clearAlbum()
  this.mensageService.clearLabelList();

  this.mensageService.setAlbum(album);

  this.router.navigate(['./trackCrear']);
}


modificarTrack(track:any){

  console.log("modificaTrack",track);
  this.mensageService.clearTrack();
  this.mensageService.clearArtista()
  this.mensageService.clearAlbum()
  this.mensageService.clearLabelList();
  this.mensageService.setTrack(track);
  this.router.navigate(['./trackCrear']);


}

addTrackList(album:Album,numberDisc:number, numberTracks:number){
   console.log("addTrackList",album);
   console.log("addTrackList",numberDisc);
   console.log("addTrackList",numberTracks);
   this.mensageService.clearTrack();
  this.mensageService.setAlbum(album);
  this.mensageService.setListTrack(numberDisc,numberTracks);
  this.router.navigate(['./tracklistadd']);
}


// Conversiones de datos


trasnformDateToString(day:any):string{

return  [day.year, day.month, day.day].join('/');
}

transfomrStringToDate(day:string):any{
console.log('transfomrStringToDate');
console.log(day);

   var year = day.slice(0, 4);
   var month = day.slice(5, 7);
   var day = day.slice(8);

return  {'year':Number(year),'month':Number( month), 'day':Number(day)};
}

transformlineToYYYY(line:string):string{

  return line.slice(0,4);  // extrae los 4 primeros desde 0 hasta el 4sin incluirlo

}

transformlineTotext(line:string):string{

  return line.slice(5).trim(); // si no tiene la segunda variable extrae hasta el final

}

transformYYYY_Text_to_Line(yyyy:string,text:string):string{
  console.log(yyyy+' '+text);
  return yyyy+' '+text;
}

transformGenres(genres:string[]):any{
    console.log('transformGenres',genres);
    let result=[];
    genres.forEach(function(element) {
      result.push({'genre':element});

    });


     console.log('transformGenres result',JSON.stringify(result));
    return  JSON.stringify(result) ;
}


transformTerritory(territory:string[]):any{
    console.log('transformTerritory',territory);
    let result=[];
    territory.forEach(function(element) {
      result.push({'territory':element});

    });


     // console.log('transformTerritory result',JSON.stringify(result));
    return  JSON.stringify(result) ;
}



}

