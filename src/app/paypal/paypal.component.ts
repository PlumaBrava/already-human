import { Component, AfterViewChecked, OnInit , Input} from '@angular/core';
declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent  implements AfterViewChecked {
    @Input() precio:number;
    @Input() moneda:string;

// console.log("PaypalComponent");
// console.log(this.precio);
// console.log(this.moneda);
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AUufSUiTr3NC5a3VFjusrRrVz7GXrFOzDdrCiDM40KAPIcbjTDlP1ukZmdi8wItAK0-wBvQrR05cPEHW',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
        console.log("PaypalComponent");
console.log(this.precio);
console.log(this.moneda);
      return actions.payment.create({
        payment: {
          transactions: [
            // { amount: { total: this.finalAmount, currency: 'EUR' } }
            { amount: { total: this.precio, currency:this.moneda } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log("payment ok");
        console.log(payment);

        //Do something when payment is successful.
      }).catch((error)=>{
          console.log("payment error");
        console.log(error);

      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  };

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  };
ngOnInit() {

console.log("PaypalComponent");
console.log(this.precio);
console.log(this.moneda);
    // if (window.navigator && window.navigator.geolocation) {

    //     window.navigator.geolocation.getCurrentPosition(
    //         position => {
    //             // this.geolocationPosition = position,
    //                 console.log("position");
    //                 console.log(position);
    //         },
    //         error => {
    //             switch (error.code) {
    //                 case 1:
    //                     console.log('Permission Denied');
    //                     break;
    //                 case 2:
    //                     console.log('Position Unavailable');
    //                     break;
    //                 case 3:
    //                     console.log('Timeout');
    //                     break;
    //             }
    //         }
    //     );
    // };
};


}
