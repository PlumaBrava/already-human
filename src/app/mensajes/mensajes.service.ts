import { Injectable } from '@angular/core';
import { Album } from '../album/album';
import { Artista } from '../artistas/artista';
import { Track } from '../track/track';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
artistasList: any[] = [];
labelList: any[] = [];
 album: Album = new Album();
 artista: Artista = new Artista();
 track: Track = new Track();

  constructor() { }



        // Label

  addLabelList(label: any):void {
    this.labelList.push(label);
  }

sacarLabelList(label: any):void {


    for (var i = 0; i < this.labelList.length; i+=1) {

      if(this.labelList[i].id==label.id)
          this.labelList.splice(i, 1);
    }
  }
getLabel(){
    return this.labelList;
}


  clearLabelList():void {
    this.labelList = [];
  }



 // Album


 setAlbum(album: Album):void {
    this.album=album;
  }


 setAlbumObs(album: Album): Observable<Album> {
   this.album=album;
    return of (this.album);
  }

getAlbumObs(): Observable<Album> {

    return of (this.album);
  }

getAlbum():Album {
    return this.album;
  }
clearAlbum():void{
    this.album=new Album();
}


// Track


 setTrack(track: Track):void {
    this.track=track;
  }


 setTrackObs(track: Track): Observable<Track> {
   this.track=track;
    return of (this.track);
  }

getTrackObs(): Observable<Track> {

    return of (this.track);
  }

getTrack():Track {
    return this.track;
  }
clearTrack():void{
    this.track=new Track();
}



 // artista


 setArtista(artista: Artista):void {
    this.artista=artista;
  }


getArtista():Artista {
    return this.artista;
  }
clearArtista():void{
    this.artista=new Artista();
}

setArtistaobs(artista:Artista):Observable<Artista>{
    this.artista=artista;
    return of (this.artista);
}

getArtitaObs(): Observable<Artista> {

    return of (this.artista);
  }


 addArtistaList(artista: any):void {
    this.artistasList.push(artista);
  }


sacarArtistaList(artista: any):void {


    for (var i = 0; i < this.artistasList.length; i+=1) {

      if(this.artistasList[i].id==artista.id)
          this.artistasList.splice(i, 1);
    }


  }


getArtistaList(){
    return this.artistasList;
}

  clearArtistaList():void {
    this.artistasList = [];
  }



}


