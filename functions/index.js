// Chekout Personalizado
var PUBLIC_KEY='TEST-c7ca9bb8-3dbb-4f81-a6dc-9413a6707a56';
var ACCESS_TOCKEN= 'TEST-7455599808952903-122715-70dde9ce42ec91a1b1731e9dae3d3875__LA_LD__-19679536';

// Check out basico
// Aplicación: 19679536 - MercadoPago application (mp-app-19679536)
var CLIENT_ID= 7455599808952903;
var CLIENT_SECRET= 'vuoWxzb0KyFKHXCL10RAiq70jQAzp8F7';


const functions = require('firebase-functions');
// const nodemailer = require('nodemailer');
// const cors = require('cors')({origin: true});
var mercadopago = require('mercadopago');
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