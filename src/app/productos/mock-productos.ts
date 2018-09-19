import { Producto } from '../productos/producto';

export const PRODUCTOS: Producto[] =[
  { id: 1, name: "already human, already", imagen:"../assets/Imagenes/disco1.gif",alternativaProducto:['MP3','WAV'],alternativaMoneda:['ARG','EUR'],
     ofertas: [
         {titulo:"titulo1",  moneda: "ARG",producto:'MP3', precio: 1.1,  plataforma: "MP", link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4e66401f-8f8b-44b6-a711-75baaa84eb8b"},
         {titulo:"titulo1",  moneda: "ARG",producto:'WAV', precio: 1.2,  plataforma: "MP", link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4e66401f-8f8b-44b6-a711-75baaa84eb8b"},
         {titulo:"titulo1",  moneda: "EUR",producto:'MP3', precio: 2.3,  plataforma: "PayPal", link:""},
         {titulo:"titulo1",  moneda: "EUR",producto:'WAV', precio: 2.4,  plataforma: "PayPal", link:""},
         ]
  },
  { id: 2, name: 'Mr. Nice', imagen:'../assets/Imagenes/disco2.gif',alternativaProducto:['MP3','WAV'],alternativaMoneda:['ARG','EUR'],
  ofertas: [
         {titulo:"titulo1",  moneda: "ARG",producto:'MP3', precio: 1.1,  plataforma: "MP", link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4141cf4a-ab3b-4080-84e0-1ea175882996"},
         {titulo:"titulo1",  moneda: "ARG",producto:'WAV', precio: 1.2,  plataforma: "MP", link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4141cf4a-ab3b-4080-84e0-1ea175882996"},
         {titulo:"titulo1",  moneda: "EUR",producto:'MP3', precio: 2.3,  plataforma: "PayPal",link:""},
         {titulo:"titulo1",  moneda: "EUR",producto:'WAV', precio: 2.4,  plataforma: "PayPal",link:""},

         ]
},
  { id: 3, name: 'S-Bahn', imagen:'../assets/Imagenes/disco3.gif',alternativaProducto:['MP3','WAV'],alternativaMoneda:['ARG','EUR'], ofertas: [
         {titulo:"titulo1",  moneda: "ARG",producto:'MP3', precio: 1.1,  plataforma: "MP",link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4141cf4a-ab3b-4080-84e0-1ea175882996"},
         {titulo:"titulo1",  moneda: "ARG",producto:'WAV', precio: 1.2,  plataforma: "MP",link:"https://www.mercadopago.com/mla/checkout/start?pref_id=19679536-4141cf4a-ab3b-4080-84e0-1ea175882996"},
         {titulo:"titulo1",  moneda: "EUR",producto:'MP3', precio: 2.3,  plataforma: "PayPal",link:""},
         {titulo:"titulo1",  moneda: "EUR",producto:'WAV', precio: 2.4,  plataforma: "PayPal",link:""},

         ]}

];