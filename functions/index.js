axios = require('axios');
const formidable = require('formidable');
const Busboy = require('busboy');
var fs = require("fs");
var request = require("request");

var usuario = 'nutralmix';
var password = '159';
var id = 3967;
var desde = '2018-08-01 01:00:00';
var hasta = '2018-10-18 00:00:00';



1// Chekout Personalizado/
var PUBLIC_KEY='TEST-c7ca9bb8-3dbb-4f81-a6dc-9413a6707a56';
var ACCESS_TOCKEN= 'TEST-7455599808952903-122715-70dde9ce42ec91a1b1731e9dae3d3875__LA_LD__-19679536';

// Check out basico
// Aplicación: 19679536 - MercadoPago application (mp-app-19679536)
var CLIENT_ID= 7455599808952903;
var CLIENT_SECRET= 'vuoWxzb0KyFKHXCL10RAiq70jQAzp8F7';


const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
var mercadopago = require('mercadopago');

const https = require('https');
const curl = new (require ('curl-request')) ();

cont dashgoAccessKey='laflota-kladsjf-2229-5582-5222-fkgnnEAD'  //Produccion
// const dashgoAccessKey='demo-9yKGSuHvuYvY6KFqFAMR'  //Desarrollo

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var config={
  "client_id": CLIENT_ID,
  "client_secret": CLIENT_SECRET,
  "access_token": ACCESS_TOCKEN,

};
mercadopago.configure({
      sandbox: true,
    access_token: ACCESS_TOCKEN
    // show_promise_error default es true Muesta el error para el catch
});

exports.pagoTarjeta = functions.https.onRequest( (req, res) =>  {
    // var mp = new MP (CLIENT_ID, CLIENT_SECRET);
      mercadopago.configurations.setAccessToken(config.access_token);
    console.log("pagoTarjeta");
    console.log(mercadopago);
    var preference = {
        "items": [
            {
                "title": "Multicolor kite",
                "quantity": 1,
                "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                "unit_price": 10.0
            }
        ]
    };

    mercadopago.createPreference (preference, function (err, data){
        console.log("createPreference");
        if (err) {
            res.send (err);
        } else {
            res.render ("button", {"preference": data});
        }
    });
});



exports.enviarEmail = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
  // let remetente = req.query.remetente;
  // let pass = req.query.pass;

 let remetente = "perez.juan.jose@gmail.com";
  // let pass = "Pluma**0";
  let pass = "pffnkjowsytmbzpy";


  // let url = "smtps://"+req.query.remetente+":"+encodeURIComponent(pass) + "@smtp.gmail.com:465";
  let url = "smtps://"+remetente+":"+encodeURIComponent(pass) + "@smtp.gmail.com:465";
  let transporter = nodemailer.createTransport(url);


console.log("llego pedido para enviar mail");
console.log("req",req);
console.log("req.method.OPTIONS",req.method.OPTIONS);

console.log("req.body",req.body); //funciona pasando un objeto en http post, cuando se pasa como argumento
console.log("req.headers",req.headers);
console.log("req.query.remetente",req.query.remetente);    // funcionan  al ponerlos en la url del pedido
console.log("req.query.assunto",req.query.assunto);
console.log("req.assunto",req.query.assunto);


    // let assunto = req.query.assunto;
    // let destinatarios = req.query.destinatarios; // lista de e-mails destinatarios separados por ,
    // let corpo = req.query.corpo;
    // let corpoHtml = req.query.corpoHtml;

    let assunto = "test";
    let destinatarios = "perez.juan.jose@gmail.com"; // lista de e-mails destinatarios separados por ,
    let corpo = "texto cuerpo";
    let corpoHtml = "req.query.corpoHtml";



    let email = {
        from: remetente,
        to: destinatarios,
        subject: req.query.assunto,
        text: corpo,
        html: corpoHtml
    };




    transporter.sendMail(email, (error, info) => {
        if (error) {
          res.status(400).send('error'+error);
          console.log(error);
          // reject(error);
          // return console.log(error);
        } else {
          console.log('Mensagem %s enviada: %s', info.messageId, info.response);
          res.status(200).send('info'+info);
          // resolve('ok '+info);
         // return   console.log('Mensagem %s enviada: %s', info.messageId, info.response);
         }
    });



  });
});

exports.listarAlbumServer =functions.https.onRequest((req, res) => {
console.log("llego listarAlbumServer");

  cors(req, res, () => {


    console.log("req.body",req.body);
  console.log("req.headers",req.headers);
console.log("req.params",req.params);
console.log("req.params.var1",req.params.var1);
console.log("req.params.var2",req.params.var2);
console.log("req.query.params",req.query.params);
//   let url = "http://apidev.dashgo.com/api/v1/albums/";

// https.he
//  https.header.append('Content-Type', "application/json");
//     https.header.append('Access-Control-Allow-Origin', "*");
//     https.header.append('X-Access-Key', Secret_Key);


// const options = {
//                hostname: "http://apidev.dashgo.com/api/v1/albums/",
//                 // port: 80,
//                // path: "/api/v1/albums/" ,
//                method: 'GET',
//                header: {
//                 // 'Content-Type': 'application/json',//; charset=utf-8',
//                 'X-Access-Key': Secret_Key
//                 }
//        };

curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.get ('http://apidev.dashgo.com/api/v1/albums/')
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});





  // https.request(options, (resp) => {
  //   let data = '';

  //   // A chunk of data has been recieved.
  //   resp.on('data', (chunk) => {
  //     data += chunk;
  //   });

  //   // The whole response has been received. Print out the result.
  //   resp.on('end', () => {
  //     console.log(JSON.parse(data).explanation);
  //       res.status(200).send(data);
  //   });

  // }).on("error", (err) => {
  //   console.log("Error: " + err.message);
  //   res.status(400).send('Error'+ err.message);
  // });





  });
});

exports.subirAlbumServer =functions.https.onRequest((req, res) => {
console.log("llego subirAlbumServer");

  cors(req, res, () => {


curl.setHeaders ([

  'X-Access-Key:'+dashgoAccessKey
])
.get ('http://apidev.dashgo.com/api/v1/albums/')
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});



exports.getDsps =functions.https.onRequest((req, res) => {
console.log("getDsps");

  cors(req, res, () => {


 const url='http://apidev.dashgo.com/api/v1/dsps';


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
// .setBody({
//  'search': req.query.search,
//  'page': req.query.page,

// })
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});

exports.getGenres =functions.https.onRequest((req, res) => {
console.log("getGenres");

  cors(req, res, () => {

 const url='http://apidev.dashgo.com/api/v1/genres';


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
// .setBody({
//  'search': req.query.search,
//  'page': req.query.page,

// })
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});


exports.setArtista =functions.https.onRequest((req, res) => {
console.log("setArtist");

  cors(req, res, () => {
console.log("req.body",req.body);
  const artista=req.body.artista;

curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])

.setBody({
 'name': artista.name,
 'label_id': artista.label_id,
 'genre': artista.genre,
 'bio': artista.bio
})
.post ('http://apidev.dashgo.com/api/v1/artists/')
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});

exports.getArtista =functions.https.onRequest((req, res) => {
console.log("getArtista");

  cors(req, res, () => {

console.log("req.query.search",req.query.search);
console.log("req.query.page",req.query.page);

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
 const url='http://apidev.dashgo.com/api/v1/artists';


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 'page': req.query.page
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});


exports.getArtistaById =functions.https.onRequest((req, res) => {
console.log("getArtista");

  cors(req, res, () => {


console.log("req.query.id",req.query.id);
let id = req.query.id;

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
 const url='http://apidev.dashgo.com/api/v1/artists/'+id;


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 // 'id': req.query.id
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});


exports.getAlbumById =functions.https.onRequest((req, res) => {
console.log("getAlbumById");

  cors(req, res, () => {

console.log("req.query.search",req.query.search);
console.log("req.query.getAlbumById",req.query.album_id);
const album_id=req.query.album_id;

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
 const url='http://apidev.dashgo.com/api/v1/albums/'+album_id;


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 // 'page': req.query.page
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});



exports.getLabel =functions.https.onRequest((req, res) => {
console.log("getLabel");

  cors(req, res, () => {

  console.log("req.query.search",req.query.search);
  console.log("req.query.page",req.query.page);

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
  const url='http://apidev.dashgo.com/api/v1/labels';


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 'page': req.query.page
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});


exports.getLabelById =functions.https.onRequest((req, res) => {
console.log("getLabel");

  cors(req, res, () => {

  console.log("req.query.id",req.query.id);
  let id=req.query.id;

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
  const url='http://apidev.dashgo.com/api/v1/labels/'+id;


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 // 'id': req.query.id
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});



exports.getAlbum =functions.https.onRequest((req, res) => {
console.log("getAlbum");

  cors(req, res, () => {

  console.log("req.query.search",req.query.search);
  console.log("req.query.page",req.query.page);

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
  const url='http://apidev.dashgo.com/api/v1/albums';


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 // 'search': req.query.search,
 'page': req.query.page
})
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});

exports.getDistributeAlbum =functions.https.onRequest((req, res) => {
console.log("getDistributeAlbum");

  cors(req, res, () => {

  console.log("req.query.dsp_site",req.query.dsp_site);
  console.log("req.query.album_id",req.query.album_id);




  const url='http://apidev.dashgo.com/api/v1/distribute/albums';

    let b={};

    if (typeof req.query.album_id !== 'undefined'){
      b['album_id']=req.query.album_id;
    }

    if ( typeof req.query.dsp_site !== 'undefined') {
      b['dsp_site']=req.query.dsp_site;
    }


console.log("b",b);

curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody(b)
// .get ('http://apidev.dashgo.com/api/v1/artists/')
.get (url)
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});




exports.setAlbum =functions.https.onRequest((req, res) => {
console.log("setAlbum");

  cors(req, res, () => {
console.log("req.body",req.body);
  const album=req.body.album;

curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])

.setBody({


  'id':album.id,
  'title': album.title,
  'label_id': album.label_id,
  'artist_id': album.artist_id,
  'release_date': album.release_date,
  'p_line': album.p_line,
  'c_line': album.c_line,
  'explicit': album.explicit,
  // cover: file;
  'upc': album.upc,
  'genre': album.genre,
  'album_genres': album.album_genres,
  'album_territories': album.album_territories,
  'language': album.language,
  'secondary_language': album.secondary_language



})
.post ('http://apidev.dashgo.com/api/v1/albums/')
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch ((e) => {
console.log (e);
 res.status(400).send('Error'+ e);
});


  });
});

exports.setAlbumForm =functions.https.onRequest((req, res) => {
console.log("setAlbumForm");

  cors(req, res, () => {




if (req.method === 'POST') {
        console.log('Post');
        const busboy = new Busboy({ headers: req.headers });
        // This object will accumulate all the uploaded files, keyed by their name
        const album = {}
        let archivo=null;
        let archivoName=null;

        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only
            // be used for files small enough to fit in memory.
            // const filepath = path.join(os.tmpdir(), fieldname);
            file.on('data',(data)=> {
              console.log('File data-- ' + fieldname + ': got ' + data.length + ' bytes');
             archivo=data;
              archivoName=filename;
              console.log('on archivo ',data);
            });
            file.on('end', (datafinal)=> {
              console.log('datafinal',datafinal);
              console.log('datafinal archivo',archivo);
              // album['cover'] = archivo;
              // console.log('album on end',album);

            });

            // console.log(`file '${fieldname}' to `);
             // res.status(200).send({'statusCode':'Termino file'});
            // file.pipe(fs.createWriteStream(filepath));
        });




            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated)=> {

            album[fieldname] = val;
            console.log('album field: ',album);
            });


           // busboy.on('data', (fieldname, val, fieldnameTruncated, valTruncated)=> {
           //      console.log('data [' + fieldname + ']: value: ',val);
           //        uploads[fieldname] = { file: fieldname }
           //    });
                  // This callback will be invoked after all uploaded files are saved.
          busboy.on('finish', () => {


              album['cover']= { value: archivo,
                                options: { filename: archivoName, contentType: null }
                              }  ;

                               console.log('album finish :',album);

var options = { method: 'POST',
  url: 'http://apidev.dashgo.com/api/v1/albums',
  headers:
   {

     'cache-control': 'no-cache',
     'x-access-key': dashgoAccessKey,
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData:album
   // { title: 'Juan request2',
   //   label_id: '141',
   //   artist_id: '29274',
   //   release_date: '2018-11-01',
   //   p_line: '2018 test',
   //   c_line: '2018 another test',
   //   explicit: '0',
   //   cover:
   //    { value: archivo,
   //      options: { filename: archivoName, contentType: null }
   //       }
   //    }
       };

request(options,  (error, response, body)=> {
  console.log('error',error);
  console.log('body',body);
  console.log('response',response);
  if (error){res.status(400).send('Error'+ e);}
  else {
    res.status(200).send({'response':response,'body':body});
  }

  console.log(body);
});



            });





            // res.status(200).send({'statusCode':'Termino finish'});
            // for (const name in uploads) {
            //     const upload = uploads[name];
            //     const file = upload.file;
            //     // res.write(`${file}\n`);
                // fs.unlinkSync(file);
            // }
            // res.end();
        // });

        // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
        // a callback when it's finished.
        busboy.end(req.rawBody);

      // req.pipe(busboy);

    } else {
        // Client error - only support POST
        res.status(405).end();
    }


});


});

exports.deleteAlbum =functions.https.onRequest((req, res) => {
console.log("deleteAlbum");
console.log("req",req);
console.log("req.query.id",req.query.id);
 let album_id=req.query.id;



    cors(req, res, () => {
      console.log("cors");

      if (req.method === 'DELETE') {
          console.log('DELETE');
          var options = { method: 'DELETE',
          url: 'http://apidev.dashgo.com/api/v1/albums/artists/'+album_id,
          headers:
           {

             'cache-control': 'no-cache',
             'x-access-key': dashgoAccessKey,
             'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
              },

               };

          request(options,  (error, response, body)=> {
            console.log('error',error);
            console.log('body',body);
            console.log('response',response);
            if (error){
                console.log('Error'+ error);
              res.status(400).send('Error'+ error);}
            else {
                console.log({'response':response,'body':body});
              res.status(200).send({'response':response,'body':body});
            }
          });

      } else {
        // Client error - only support delete
         console.log("Client error - only support delete");
        res.status(405).end();
      }
    });

});

exports.setDistributeAlbums =functions.https.onRequest((req, res) => {
    console.log("setDistributeAlbums");
    cors(req, res, () => {
      console.log("req.body",req.body);
      console.log("req.body.title",req.body.title);

      if (req.method === 'POST') {
        console.log('Post');
        const busboy = new Busboy({ headers: req.headers });

        // const distribute = {};
        const album = {};
        const dsp = {};
        let archivo=null;
        let archivoName=null;

        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only
            // be used for files small enough to fit in memory.
            // const filepath = path.join(os.tmpdir(), fieldname);
            file.on('data',(data)=> {
                    console.log('File data[' + fieldname + '] got ' + data.length + ' bytes');

                    archivo=data;
                    archivoName=filename;
            });

            file.on('end', (datafinal)=> {
                    console.log('datafinal',datafinal);
            });


         });

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated)=> {

            if(fieldname==='album_id'){
              album['album_id']=val;
              console.log('album field: ',dsp);
            }else {

            dsp[fieldname] = val;
            console.log('dsp field: ',dsp);
            }
            });


          busboy.on('finish', () => {
                      console.log('finish archivoName: ',archivoName);
                      // console.log('finish archivo: ',archivo);
                      // track['track']= { value: archivo,
                      //                     options: { filename: archivoName, contentType: null }
                      //                   }  ;
                      // distribute={'dsp':dsp,'album_ids':album};
                      distribute={
                        // 'dsp':[{'beatport':true},{'amie':true}],
                        'dsp':{'beatport':true,'amie':true},
                        'album_ids':{'album_id':45079}
                      };
                      console.log('distribute :',distribute);
                      var options = { method: 'POST',
                                      // json: true,
                                      url: 'http://apidev.dashgo.com/api/v1/distribute/albums',
                                      headers:   {

                                               'cache-control': 'no-cache',
                                               'x-access-key': dashgoAccessKey,
                                               'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                                            formData:distribute
                                     };

                        request(options,  (error, response, body)=> {
                        console.log('error',error);
                        console.log('body',body);
                        console.log('response',response);
                            if (error){res.status(400).send('Error'+ e);}
                            else {
                                  res.status(200).send({'response':response,'body':body});
                            }

                         console.log(body);
                        });
            });

        busboy.end(req.rawBody);



    } else {
        // Client error - only support POST
        res.status(405).end();
    }


});

});


exports.setTrack =functions.https.onRequest((req, res) => {
    console.log("setTrack");
    cors(req, res, () => {
      console.log("req.body",req.body);
      console.log("req.body.title",req.body.title);

      if (req.method === 'POST') {
        console.log('Post');
        const busboy = new Busboy({ headers: req.headers });

        const track = {};
        let archivo=null;
        let archivoName=null;

        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only
            // be used for files small enough to fit in memory.
            // const filepath = path.join(os.tmpdir(), fieldname);
            file.on('data',(data)=> {
                    console.log('File data[' + fieldname + '] got ' + data.length + ' bytes');

                    archivo=data;
                    archivoName=filename;
            });

            file.on('end', (datafinal)=> {
                    console.log('datafinal',datafinal);
            });


         });

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated)=> {

            track[fieldname] = val;
            console.log('track field: ',track);
            });


          busboy.on('finish', () => {
                      console.log('finish archivoName: ',archivoName);
                      console.log('finish archivo: ',archivo);
                      track['track']= { value: archivo,
                                          options: { filename: archivoName, contentType: null }
                                        }  ;
                      console.log('track finish :',track);
                      var options = { method: 'POST',
                                      url: 'http://apidev.dashgo.com/api/v1/tracks',
                                      headers:   {
                                              // 'postman-token': 'd4c1a8a6-143d-7287-b3d6-4bc5e864ec42',
                                               'cache-control': 'no-cache',
                                               'x-access-key': dashgoAccessKey,
                                               'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                                            formData:track
                                     };

                        request(options,  (error, response, body)=> {
                        console.log('error',error);
                        console.log('body',body);
                        console.log('response',response);
                            if (error){res.status(400).send('Error'+ e);}
                            else {
                                  res.status(200).send({'response':response,'body':body});
                            }

                         console.log(body);
                        });
            });

        busboy.end(req.rawBody);



    } else {
        // Client error - only support POST
        res.status(405).end();
    }


});

});

exports.updateTrack =functions.https.onRequest((req, res) => {
    console.log("setTrack");
    cors(req, res, () => {
      console.log("req.body",req.body);
      console.log("req.body.title",req.body.title);

      if (req.method === 'PUT') {
        console.log('PUT');
        const busboy = new Busboy({ headers: req.headers });

        const track = {};
        let archivo=null;
        let archivoName=null;

        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only
            // be used for files small enough to fit in memory.
            // const filepath = path.join(os.tmpdir(), fieldname);
            file.on('data',(data)=> {
                    console.log('File data[' + fieldname + '] got ' + data.length + ' bytes');

                    archivo=data;
                    archivoName=filename;
            });

            file.on('end', (datafinal)=> {
                    console.log('datafinal',datafinal);
            });


         });

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated)=> {

            track[fieldname] = val;
            console.log('track field: ',track);
            });


          busboy.on('finish', () => {
                      console.log('finish archivoName: ',archivoName);
                      console.log('finish archivo: ',archivo);
                      track['track']= { value: archivo,
                                          options: { filename: archivoName, contentType: null }
                                        }  ;
                      console.log('track finish :',track);
                      var options = { method: 'PUT',
                                      url: 'http://apidev.dashgo.com/api/v1/tracks/'+track.id,
                                      headers:   {
                                              // 'postman-token': 'd4c1a8a6-143d-7287-b3d6-4bc5e864ec42',
                                               'cache-control': 'no-cache',
                                               'x-access-key': dashgoAccessKey,
                                               'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                                            formData:track
                                     };

                        request(options,  (error, response, body)=> {
                        console.log('error',error);
                        console.log('body',body);
                        console.log('response',response);
                            if (error){res.status(400).send('Error'+ e);}
                            else {
                                  res.status(200).send({'response':response,'body':body});
                            }

                         console.log(body);
                        });
            });

        busboy.end(req.rawBody);



    } else {
        // Client error - only support POST
        res.status(405).end();
    }


});

});




exports.getGenres =functions.https.onRequest((req, res) => {
console.log("getGenres");

  cors(req, res, () => {

  curl.setHeaders ([
          'X-Access-Key:'+dashgoAccessKey
  ])
  .get ('http://apidev.dashgo.com/api/v1/genres/')
  .then (({statusCode, body, headers}) => {
    console.log (statusCode, body, headers)
    res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
    return ("ok");})
  .catch ((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });

  });

});


exports.getPublishers =functions.https.onRequest((req, res) => {
console.log("getPublishers");

  cors(req, res, () => {

  curl.setHeaders ([
          'X-Access-Key:'+dashgoAccessKey
  ])
  .get ('http://apidev.dashgo.com/api/v1/publishers/')
  .then (({statusCode, body, headers}) => {
    console.log (statusCode, body, headers)
    res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
    return ("ok");})
  .catch ((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });

  });

});


exports.buscaVehiculos =functions.https.onRequest((req, res) => {
console.log("buscaVehiculos");

  cors(req, res, () => {


axios.post('https://ver.infotrak.com.ar:8144/api/vehiculos', {
    'Usuario': usuario,
    'Password':password
  })
// axios.all([buscaVehiculos()])
    .then((vehiculos)=> {
      console.log(vehiculos.data);
        res.status(200).send({'vehiculos':vehiculos.data});
                 return ("ok");
            // console.log('\x1b[35mVehiculos encontrados: ',vehiculos.data.length,'\x1b[30m');
            // if (vehiculos.data.length>5) {
            //     console.log('\x1b[35mMostrando primeras 5\x1b[30m')
            //     console.log(vehiculos.data.slice(0,4));
            //      res.status(200).send({'vehiculos':vehiculos});
            //      return ("ok");
            // }
            // else {
            //   res.status(200).send({'vehiculosMenor':vehiculos});
            //   return ("ok menor5");
            // }

            }
    )
    .catch((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });





});
   });

// var buscaHistoricos=function () {
//     return axios.post('https://ver.infotrak.com.ar:8144/api/historicos', {
//         Usuario: usuario,
//         Password: password,
//         Id: id,
//         Desde: desde,
//         Hasta: hasta
//     })
// };

// var buscaVehiculos =function () {
//     return axios.post('https://ver.infotrak.com.ar:8144/api/vehiculos', {
//         Usuario: usuario,
//         Password: password
//     })
//  };
exports.buscaVehiculosHistorico =functions.https.onRequest((req, res) => {
console.log("buscaHistoricos");

  cors(req, res, () => {


axios.post('https://ver.infotrak.com.ar:8144/api/historicos', {
        'Usuario': usuario,
        'Password': password,
        'Id': id,
        'Desde': desde,
        'Hasta': hasta
    })

// axios.all([buscaVehiculos()])
    .then((vehiculos)=> {
      console.log(vehiculos.data);
        res.status(200).send({'vehiculosHistorico':vehiculos.data});
                 return ("ok");
            // console.log('\x1b[35mVehiculos encontrados: ',vehiculos.data.length,'\x1b[30m');
            // if (vehiculos.data.length>5) {
            //     console.log('\x1b[35mMostrando primeras 5\x1b[30m')
            //     console.log(vehiculos.data.slice(0,4));
            //      res.status(200).send({'vehiculos':vehiculos});
            //      return ("ok");
            // }
            // else {
            //   res.status(200).send({'vehiculosMenor':vehiculos});
            //   return ("ok menor5");
            // }

            }
    )
    .catch((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });





});
   });







exports.getTracks =functions.https.onRequest((req, res) => {
  console.log("getArtista");
  cors(req, res, () => {

    console.log("req.query.album_id",req.query.album_id);
    console.log("req.query.isrc",req.query.isrc);
    console.log("req.query.page",req.query.page);

    // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
    const url='http://apidev.dashgo.com/api/v1/tracks';

    let b={};

    if (typeof req.query.album_id !== 'undefined'){
      b['album_id']=req.query.album_id;
    }

    if ( typeof req.query.isrc !== 'undefined') {
      b['isrc']=req.query.isrc;
    }

    if ( typeof req.query.page !== 'undefined'){
      b['page']=req.query.page;
    }

 console.log("Log b",b);

    curl.setHeaders (['X-Access-Key:'+dashgoAccessKey])
    .setBody(
    // {
    // 'album_id': req.query.album_id
    // 'isrc': req.query.isrc,
    // 'page': req.query.page
        // }
        b)
    .get (url)
    .then (({statusCode, body, headers}) => {
      console.log (statusCode, body, headers)
      res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
      return ("ok");
    })
    .catch ((e) => {
      console.log (e);
      res.status(400).send('Error'+ e);
    });
  });
});


exports.getUsers =functions.https.onRequest((req, res) => {
  console.log("getArtista");
  cors(req, res, () => {

    const url='http://apidev.dashgo.com/api/v1/users';


    curl.setHeaders (['X-Access-Key:'+dashgoAccessKey])
    // .setBody({
    // // 'album_id': req.query.search,
    // // 'isrc': req.query.isrc,
    // 'page': req.query.page
    // })
    .get (url)
    .then (({statusCode, body, headers}) => {
      console.log (statusCode, body, headers)
      res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
      return ("ok");
    })
    .catch ((e) => {
      console.log (e);
      res.status(400).send('Error'+ e);
    });
  });
});

