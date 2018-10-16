// Chekout Personalizado
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

// cont dashgoAccessKey='laflota-kladsjf-2229-5582-5222-fkgnnEAD'  //Produccion
const dashgoAccessKey='demo-9yKGSuHvuYvY6KFqFAMR'  //Desarrollo

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
console.log("req.assunto",req.query.assunto);
console.log("req.body",req.body);
console.log("req.headers",req.headers);
console.log("req.query.remetente",req.query.remetente);
console.log("req.query.assunto",req.query.assunto);



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
console.log("llego listarAlbumServer 80");

  cors(req, res, () => {
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
    // 'X-Access-Key: demo-9yKGSuHvuYvY6KFqFAMR'
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

exports.getArtist =functions.https.onRequest((req, res) => {
console.log("getArtist");

  cors(req, res, () => {


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.get ('http://apidev.dashgo.com/api/v1/artists/')
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


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])
.setBody({
 'name': 'Juan',
 'label_id': 1,
 'genre': 'pop',
 'bio': 'My bio goes here'
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


curl.setHeaders ([

    'X-Access-Key:'+dashgoAccessKey
])

.get ('http://apidev.dashgo.com/api/v1/artists/')
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