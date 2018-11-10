// const axios = require('axios');
// const formidable = require('formidable');
const Busboy = require('busboy');
// const fs = require("fs");
const request = require("request");





1// Chekout Personalizado/
const PUBLIC_KEY='TEST-c7ca9bb8-3dbb-4f81-a6dc-9413a6707a56';
const ACCESS_TOCKEN= 'TEST-7455599808952903-122715-70dde9ce42ec91a1b1731e9dae3d3875__LA_LD__-19679536';

// Check out basico
// Aplicación: 19679536 - MercadoPago application (mp-app-19679536)
const CLIENT_ID= 7455599808952903;
const CLIENT_SECRET= 'vuoWxzb0KyFKHXCL10RAiq70jQAzp8F7';


const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const mercadopago = require('mercadopago');

const https = require('https');
const curl = new (require ('curl-request')) ();


// firebase use --add (permite agregar un proyecto y seleccionar un aleas)
// En este caso yo seleccione default (laflota) para produccion y desarrollo (ignatest)
//  Configuración de variables de entrono
//  ejemplo para desarrollo
//  firebase functions:config:set dashgo.url="http://apidev.dashgo.com/api/v1/"
//  firebase functions:config:set dashgo.dashgoaccesskey="laflota-kladsjf-2229-5582-5222-fkgnnEAD"
//
//  Con firebase funtions:config:get tenemos un json con los datos.
//  para acceder hacemos functions.config().someservice.id,


 const dashgoAccessKey=functions.config().dashgo.dashgoaccesskey; //(usando variables de entrono)
// const dashgoAccessKey='laflota-kladsjf-2229-5582-5222-fkgnnEAD'  //Produccion
// const dashgoAccessKey='demo-9yKGSuHvuYvY6KFqFAMR'  //Desarrollo


 const URL_API=functions.config().dashgo.url//(usando variables de entrono)
// const URL_API='https://api.dashgo.com/api/v1/';// Producción
// const URL_API='http://apidev.dashgo.com/api/v1/'; // Desarrollo


const config={
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
    const preference = {
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

 const remetente = "perez.juan.jose@gmail.com";
  // let pass = "Pluma**0";
  const pass = "pffnkjowsytmbzpy";


  // let url = "smtps://"+req.query.remetente+":"+encodeURIComponent(pass) + "@smtp.gmail.com:465";
  const url = "smtps://"+remetente+":"+encodeURIComponent(pass) + "@smtp.gmail.com:465";
  const transporter = nodemailer.createTransport(url);


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

    // const assunto = "test";
    const destinatarios = "perez.juan.jose@gmail.com"; // lista de e-mails destinatarios separados por ,
    const corpo = "texto cuerpo";
    const corpoHtml = "req.query.corpoHtml";



    const email = {
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


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.get (URL_API+'albums/')
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
.get (URL_API+'albums/')
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


 const url=URL_API+'dsps';


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

 const url=URL_API+'genres';


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
.post (URL_API+'artists/')
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
 const url=URL_API+'artists';


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
const id = req.query.id;

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
 const url=URL_API+'artists/'+id;


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
 const url=URL_API+'albums/'+album_id;


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
  const url=URL_API+'labels';


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
  const id=req.query.id;

 // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
  const url=URL_API+'labels/'+id;


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
  const url=URL_API+'albums';


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




  const url=URL_API+'distribute/albums';

    const b={};

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
.post (URL_API+'albums/')
.then (({statusCode, body, headers}) => {
console.log (statusCode, body, headers)
 res.status(200).send({'statusCode':statusCode,'body':body,'headers':headers});
return ("ok");
})
.catch (e => {
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

const options = { method: 'POST',
  url: URL_API+'albums',
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
  if (error){res.status(400).send('Error'+ error);}
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
 const album_id=req.query.id;



    cors(req, res, () => {
      console.log("cors");

      if (req.method === 'DELETE') {
          console.log('DELETE');
          const options = { method: 'DELETE',
          url: URL_API+'albums/artists/'+album_id,
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
        // let archivo=null;
        let archivoName=null;

        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
            // Note that os.tmpdir() is an in-memory file system, so should only
            // be used for files small enough to fit in memory.
            // const filepath = path.join(os.tmpdir(), fieldname);
            file.on('data',(data)=> {
                    console.log('File data[' + fieldname + '] got ' + data.length + ' bytes');

                    // archivo=data;
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
                      const distribute={
                        // 'dsp':[{'beatport':true},{'amie':true}],
                        'dsp':{'beatport':true,'amie':true},
                        'album_ids':{'album_id':45079}
                      };
                      console.log('distribute :',distribute);
                      const options = { method: 'POST',
                                      // json: true,
                                      url: URL_API+'distribute/albums',
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
                            if (error){res.status(400).send('Error'+ error);}
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
                      const options = { method: 'POST',
                                      url: URL_API+'tracks',
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
                            if (error){res.status(400).send('Error'+ error);}
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

        const track = {'id':0};
        // track['id'] =null;/
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
                      const options = { method: 'PUT',
                                      url: URL_API+'tracks/'+track.id,
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
                            if (error){res.status(400).send('Error'+ error);}
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
  .get (URL_API+'genres/')
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
  .get (URL_API+'publishers/')
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








exports.getTracks =functions.https.onRequest((req, res) => {
  console.log("getArtista");
  cors(req, res, () => {

    console.log("req.query.album_id",req.query.album_id);
    console.log("req.query.isrc",req.query.isrc);
    console.log("req.query.page",req.query.page);

    // const url='http://apidev.dashgo.com/api/v1/artists&search='+req.query.search+ '&page=' +req.query.page;
    const url=URL_API+'tracks';

    const b={};

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

    const url=URL_API+'users';


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

