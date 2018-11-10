import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams   } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import {RequestOptions, URLSearchParams  } from '@angular/common/http';

import { Album } from '../album/album';
import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MailService {
    params:HttpParams;
    header:HttpHeaders;
    // URL_SERVER:string='https://us-central1-ignatest-c4444.cloudfunctions.net/';  //Desarrollo
   // URL_SERVER:string='https://us-central1-laflota-19ada.cloudfunctions.net/'; // Produccion
   URL_SERVER:string=environment.dashgo.URL_SERVER; // Produccion

  constructor(private _http: HttpClient) { }





sendMessage(body): Observable<any>{
    console.log("sendMessage",body);

let params: URLSearchParams = new URLSearchParams();
params.set('var1', "val1");
params.set('var2', "val2");

// let requestOptions = new RequestOptions();
// requestOptions.search = params;

    this.params = new HttpParams();
    this.header = new HttpHeaders();
    this.params.set("assunto","subjetParams");
    // this.header.append('Authorization', "clave");
    this.header.append('Content-Type', "application/json");
    this.header.append('Access-Control-Allow-Origin', "*");
    // this.header.append('Access-Control-Allow-Origin', "http://localhost:4200");

   var config={
        params:this.params,
        header:this.header,

    }



var body1={
        title: 'foo',
        body: body,
        userId: 1
      };

 return this._http.post(this.URL_SERVER+'enviarEmail',body1);



// return this._http.get('https://api.github.com/users/seeschweiler');

 };


ListarAlbum(body): Observable<any>{
    console.log("ListarAlbum",body);
const Secret_Key= 'demo-9yKGSuHvuYvY6KFqFAMR';


// let requestOptions = new RequestOptions();

let headerq = new HttpHeaders();

// headerq.append('Authorization','Bearer ')
    // headerq.set('Content-Type', "application/json");


    // headerq.set('Authorization', 'demo-9yKGSuHvuYvY6KFqFAMR');
    // headerq.set('X-Access-Key', 'demo-9yKGSuHvuYvY6KFqFAMR');
    headerq.set('Authorization', "X-Access-Key demo-9yKGSuHvuYvY6KFqFAMR");


const httpOptions = {
   method: 'GET',
  headers: new HttpHeaders(
  {
    // 'Content-Type':  'application/json',
// 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
// "Access-Control-Allow-Credentials": "true",
// // "Access-Control-Allow-Headers": "content-type, if-none-match",
// "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
// "Access-Control-Allow-Origin": "*",
// "Access-Control-Max-Age": "3600",
// 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
 // Authorization: 'X-Access-Key:  demo-9yKGSuHvuYvY6KFqFAMR',
 Authorization: 'X-Access-Key:  demo-9yKGSuHvuYvY6KFqFAMR',
// 'X-Access-Key' : 'demo-9yKGSuHvuYvY6KFqFAMR',
 // "Accept": '*/*',
   // x-access-Key: 'demo-9yKGSuHvuYvY6KFqFAMR'
   // "Referrer-Policy": "origin"
 // withCredentials: true
}
)};


 console.log("ListarAlbum headers",httpOptions.headers.get('X-Access-Key'));

// response.setHeader("Access-Control-Allow-Credentials", "true");
// response.setHeader("Access-Control-Allow-Headers", "content-type, if-none-match");
// response.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
// response.setHeader("Access-Control-Allow-Origin", "*");
// response.setHeader("Access-Control-Max-Age", "3600");
// // httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'X-Access-Key demo-9yKGSuHvuYvY6KFqFAMR');

 return this._http.get('http://apidev.dashgo.com/api/v1/albums/',  httpOptions);


 };


ListarAlbumServer(body): Observable<any>{
    console.log("ListarAlbumServer",body);

// let params: URLSearchParams = new URLSearchParams();
let params = new HttpParams();
params.set('var1', "val11");
params.set('var2', "val22");

// let requestOptions = new RequestOptions();
// requestOptions.search = params;

    // this.params = new HttpParams();
    // this.header = new HttpHeaders();
    // this.params.set("assunto","subjetParams");
    // // this.header.append('Authorization', "clave");
    // this.header.append('Content-Type', "application/json");
    // // this.header.append('Access-Control-Allow-Origin', "*");
    // this.header.append('Access-Control-Allow-Origin', "http://localhost:4200");

    let p=HttpParams

   var config={
        params:this.params,
        header:this.header,

    }



var body1={
        search: 'foo',
        upc: body,
        page: 1
      };

 return this._http.get(this.URL_SERVER+'listarAlbumServer?params=Compra b');


// return this._http.get('https://api.github.com/users/seeschweiler');

 };

SetArtista(artista): Observable<any>{
    console.log("SetArtista",artista);





 return this._http.post(this.URL_SERVER+'setArtista',{'artista':artista});




 };

GetArtista(search:any,page:number): Observable<any>{
    console.log("GetArtista");
    console.log("GetArtista search",search);
    console.log("GetArtista page",page);

    const url:string=this.URL_SERVER+'getArtista?search='+search+'&page='+page;

 return this._http.get(url);


 };


 GetArtistaById(id:number): Observable<any>{
    console.log("GetArtistaByID");
    console.log("GetArtistaByID id",id);

    const url:string=this.URL_SERVER+'getArtistaById?id='+id;

 return this._http.get(url);


 };


 getTracks(album_id:string,isrc:string,page:number): Observable<any>{
    console.log("getTracks");
    console.log("GetArtista album_id",album_id);
    console.log("GetArtista isrc",isrc);
    console.log("GetArtista page",page);


    const url:string=this.URL_SERVER+'getTracks?album_id='+album_id;

 return this._http.get(url);


 };

 getDistributeAlbums(dsp_site:number,album_id:number): Observable<any>{
    console.log("getDistributeAlbums");
    console.log("getDistributeAlbums dsp_site",dsp_site);
    console.log("getDistributeAlbums album_id",album_id);
    let url:string=null;

    if(album_id && !dsp_site){
    url=this.URL_SERVER+'getDistributeAlbum?album_id='+album_id;
    } else if(!album_id && dsp_site){
    url=this.URL_SERVER+'getDistributeAlbum?dsp_site='+dsp_site;
    } else if(album_id && dsp_site){
    url=this.URL_SERVER+'getDistributeAlbum?dsp_site='+dsp_site+'&album_id='+album_id;
    } else {
    url=this.URL_SERVER+'getDistributeAlbum';
    }

 return this._http.get(url);


 };


setDistributeAlbums(form:FormData): Observable<any>{
    console.log("setDistributeAlbums");


 return this._http.post(this.URL_SERVER+'setDistributeAlbums',form);

 };



setTrack(form:FormData): Observable<any>{
    console.log("SetTrack");
    return this._http.post(this.URL_SERVER+'setTrack',form);

 };

 updateTrack(form:FormData): Observable<any>{
   console.log("updateTrack");
 return this._http.put(this.URL_SERVER+'updateTrack',form);

 };

 getUsers(): Observable<any>{
    console.log("getUsers");
    const url:string=this.URL_SERVER+'getUsers';
    return this._http.get(url);
 };

GetDsps(): Observable<any>{
    console.log("GetDsps");


    const url:string=this.URL_SERVER+'getDsps';

 return this._http.get(url);


 };




getPublishers(): Observable<any>{
    console.log("GetGenres");


    const url:string=this.URL_SERVER+'getPublishers';

 return this._http.get(url);


 };


GetGenres(): Observable<any>{
    console.log("GetGenres");


    const url:string=this.URL_SERVER+'getGenres';

 return this._http.get(url);


 };



GetAlbum(search:any,page:number): Observable<any>{
    console.log("GetAlbum");



    const url:string=this.URL_SERVER+'getAlbum?search='+search+'&page='+page;

 return this._http.get(url);


 };

GetAlbumById(album_id:number): Observable<any>{
    console.log("GetAlbumById");



    const url:string=this.URL_SERVER+'getAlbumById?album_id='+album_id;

 return this._http.get(url);


 };


SetAlbum(form:FormData): Observable<any>{
    console.log("SetAlbum");
    console.log(form.get('cover'));

 return this._http.post(this.URL_SERVER+'setAlbumForm',form);

 };

deleteAlbum(album:Album): Observable<any>{
    console.log("deleteAlbum");
    let data={'id':album.id};
    // data: {"Id": Id, "bolDeleteReq" : bolDeleteReq}
     console.log("deleteAlbum Id: ",data);
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
};
 return this._http.delete(this.URL_SERVER+'deleteAlbum?id='+album.id);

 };


GetLabel(search:any,page:number): Observable<any>{
    console.log("GetLabel");


    const url:string=this.URL_SERVER+'getLabel?search='+search+'&page='+page;

 return this._http.get(url);


 };

GetLabelById(id:number): Observable<any>{
    console.log("GetLabelByID");
    console.log("GetLabelByID id",id);

    const url:string=this.URL_SERVER+'getLabelById?id='+id;

 return this._http.get(url);


 };




buscaVehiculos(): Observable<any>{
    console.log("buscaVehiculos");


    const url:string=this.URL_SERVER+'buscaVehiculos';

 return this._http.get(url);




 };


buscaVehiculosHistorico(): Observable<any>{
    console.log("buscaVehiculosHistorico");


    const url:string=this.URL_SERVER+'buscaVehiculosHistorico';

 return this._http.get(url);




 };



crearAlbumLocal(form:FormData): Observable<any>{




const urlAlbum='http://apidev.dashgo.com/api/v1/albums/';
const headers = new HttpHeaders()
             .set('cache-control', 'no-cache')
             .set('content-type', 'application/json')
             .set('X-Access-Key:','demo-9yKGSuHvuYvY6KFqFAMR')


         // const body = {
         //     email: 'myemail@xyz.com',
         //     user_password: 'mypasss',
         //     token: 'my token'
         // }

          return this._http
                    .post(urlAlbum,form , { headers: headers });


}


}
