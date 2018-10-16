import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams   } from '@angular/common/http';
// import {RequestOptions, URLSearchParams  } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MailService {
    params:HttpParams;
    header:HttpHeaders;

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
    // this.header.append('Access-Control-Allow-Origin', "*");
    this.header.append('Access-Control-Allow-Origin', "http://localhost:4200");

   var config={
        params:this.params,
        header:this.header,

    }

  var  bodyInfotrack= {
                    mode: "raw",
                    raw: {Usuario:"nutralmix",Password:"159"}
                };


var body1={
        title: 'foo',
        body: body,
        userId: 1
      };
 // return this._http.post('https://us-central1-ignatest-c4444.cloudfunctions.net/enviarEmail',requestOptions);
 // return this._http.post('https://us-central1-ignatest-c4444.cloudfunctions.net/enviarEmail?assunto=Compra A');
 // return this._http.post('https://us-central1-ignatest-c4444.cloudfunctions.net/enviarEmail',body1);
 return this._http.post('https://ver.infotrak.com.ar:8144/api/vehiculos', bodyInfotrack,  {headers: this.header});


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
 // return this._http.get('http://apidev.dashgo.com/api/v1/albums/',   {headers: headerq});
 // return this._http.post('https://us-central1-ignatest-c4444.cloudfunctions.net/listarAlbum',"");

// return this._http.get('https://api.github.com/users/seeschweiler');

 };


ListarAlbumServer(body): Observable<any>{
    console.log("ListarAlbumServer",body);

let params: URLSearchParams = new URLSearchParams();
params.set('var1', "val1");
params.set('var2', "val2");

// let requestOptions = new RequestOptions();
// requestOptions.search = params;

    // this.params = new HttpParams();
    // this.header = new HttpHeaders();
    // this.params.set("assunto","subjetParams");
    // // this.header.append('Authorization', "clave");
    // this.header.append('Content-Type', "application/json");
    // // this.header.append('Access-Control-Allow-Origin', "*");
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

 return this._http.get('https://us-central1-ignatest-c4444.cloudfunctions.net/listarAlbumServer');


// return this._http.get('https://api.github.com/users/seeschweiler');

 };

SetArtista(body): Observable<any>{
    console.log("SetArtista",body);





 return this._http.get('https://us-central1-ignatest-c4444.cloudfunctions.net/setArtista');




 };

GetArtista(body): Observable<any>{
    console.log("GetArtista",body);

 return this._http.get('https://us-central1-ignatest-c4444.cloudfunctions.net/getArtista');




 };

GetGenres(body): Observable<any>{
    console.log("GetGenres",body);

 return this._http.get('https://us-central1-ignatest-c4444.cloudfunctions.net/getGenres');




 };


Infotrack(body): Observable<any>{
    console.log("Infotrack",body);

let params: URLSearchParams = new URLSearchParams();
params.set('var1', "val1");
params.set('var2', "val2");

// let requestOptions = new RequestOptions();
// requestOptions.search = params;

    // this.params = new HttpParams();
    this.header = new HttpHeaders();
    // this.params.set("assunto","subjetParams");
    // // this.header.append('Authorization', "clave");
    // this.header.append('Content-Type', "application/json");
    // // this.header.append('Access-Control-Allow-Origin', "*");
    // this.header.append('Access-Control-Allow-Origin', "http://localhost:4200");

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': "*",
  })
};



   var config={
        params:this.params,
        header:this.header,

    };


var  body1= {
          mode: "raw",
          raw: "{\r\n\"Usuario\":\"nutralmix\",\r\n\"Password\":\"159\"\r\n}",
        };

// "request": {
//         "method": "POST",
//         "header": [
//           {
//             "key": "Content-Type",
//             "value": "application/json"
//           }
//         ],
//         "body": {
//           "mode": "raw",
//           "raw": "{\r\n\"Usuario\":\"nutralmix\",\r\n\"Password\":\"159\"\r\n}"
//         },


 return this._http.post('https://ver.infotrak.com.ar:8144/api/vehiculos',"body1",httpOptions);




 };



}
