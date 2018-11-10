import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MensajesService }  from '../../mensajes/mensajes.service';
import {Router} from '@angular/router';
import { Artista } from '../artista';

// import { TalleresService } from '../talleres.service';

// import { MensajesService } from '../../servicios/mensajes.service'
import { MailService }  from '../../service/mail.service';

@Component({
  selector: 'app-artistascrear',
  templateUrl: './artistascrear.component.html',
  styleUrls: ['./artistascrear.component.css']
})
export class ArtistascrearComponent implements OnInit {

esperandoDatos:boolean=false;


  artista: Artista = new Artista();
  IdCreado:number=null;
  submitted = false;
  error=null;

  genre:any[]=[];

  constructor(private mailService: MailService,
          private mensageService:MensajesService,
      private router: Router) { }

  ngOnInit() {

      console.log('artista crear',this.artista);
      this.getGenre();
       this.artista=this.mensageService.getArtista();

//Lectura de label
         if(this.mensageService.getLabel().length>0){
             console.log('cargo label')
             let labelaux=this.mensageService.getLabel()[0];
             this.artista.label_id= +labelaux.id;
             this.artista.labelName= labelaux.name;

        }

  }

  newArtista(): void {
    this.submitted = false;
    this.artista = new Artista();
  }



  onSubmit() {


    this.save();
  }

  save() {
    this.error=null;
    this.esperandoDatos=true;
    this.mailService.SetArtista(this.artista).subscribe(
        data => {

                       console.log(data);
                       this.esperandoDatos=false;


                    if (data.statusCode == 200){
                        this.submitted = true;
                         console.log('status200');

                    }  else   if (data.statusCode == 201){
                        this.submitted = true;
                        this.IdCreado=data.body.id;
                         console.log('status201: IdCreado'+ this.IdCreado);

                    }else{
                           console.log('status distinto 200');
                          this.error=data.body.error;
                          this.esperandoDatos=false;
                          this.submitted = false;
                    }


            },
        error =>{
                 console.log(error);
                 this.esperandoDatos=false;
                 this.error=error;

               }

  );;

  }




getGenre() {
    this.mailService.GetGenres().subscribe(
        data => {

           // this.genre=data.body;
           this.error=data.body.error;
            console.log(this.genre);

 for (let element in data.body) {
           console.log(element+': '+data.body[element]);
this.genre.push({'id':element,'val':data.body[element]})
          }


        },
       error =>{
       console.log(error);
 }

  );;



}


buscarLabel(){
 this.grabaFormulario();
 this.mensageService.clearLabelList();
   this.router.navigate(['./labelList']);
}


grabaFormulario(){


  // todo: grabar file
  this.mensageService.setArtista(this.artista);
}

}