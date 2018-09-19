import { Component, AfterViewChecked, OnInit  } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
// implements AfterViewChecked {
//   title = 'app';
// addScript: boolean = false;
//   paypalLoad: boolean = true;

//   finalAmount: number = 1;

//   paypalConfig = {
//     env: 'sandbox',
//     client: {
//       sandbox: 'AUufSUiTr3NC5a3VFjusrRrVz7GXrFOzDdrCiDM40KAPIcbjTDlP1ukZmdi8wItAK0-wBvQrR05cPEHW',
//       production: '<your-production-key here>'
//     },
//     commit: true,
//     payment: (data, actions) => {
//       return actions.payment.create({
//         payment: {
//           transactions: [
//             { amount: { total: this.finalAmount, currency: 'EUR' } }
//           ]
//         }
//       });
//     },
//     onAuthorize: (data, actions) => {
//       return actions.payment.execute().then((payment) => {
//         //Do something when payment is successful.
//       })
//     }
//   };

//   ngAfterViewChecked(): void {
//     if (!this.addScript) {
//       this.addPaypalScript().then(() => {
//         paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
//         this.paypalLoad = false;
//       })
//     }
//   };

//   addPaypalScript() {
//     this.addScript = true;
//     return new Promise((resolve, reject) => {
//       let scripttagElement = document.createElement('script');
//       scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
//       scripttagElement.onload = resolve;
//       document.body.appendChild(scripttagElement);
//     })
//   };
// ngOnInit() {

//     if (window.navigator && window.navigator.geolocation) {

//         window.navigator.geolocation.getCurrentPosition(
//             position => {
//                 // this.geolocationPosition = position,
//                     console.log("position");
//                     console.log(position);
//             },
//             error => {
//                 switch (error.code) {
//                     case 1:
//                         console.log('Permission Denied');
//                         break;
//                     case 2:
//                         console.log('Position Unavailable');
//                         break;
//                     case 3:
//                         console.log('Timeout');
//                         break;
//                 }
//             }
//         );
//     };
// };


 // getLocation() {
 //        if (navigator.geolocation) {
 //            navigator.geolocation.getCurrentPosition(showPosition);
 //        } else {
 //            // x.innerHTML = "Geolocation is not supported by this browser.";
 //        }
 //    }
 //    function showPosition(position) {
 //        x.innerHTML = "Latitude: " + position.coords.latitude +
 //        "<br>Longitude: " + position.coords.longitude;
 //    }
}
