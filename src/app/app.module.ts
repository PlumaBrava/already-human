import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatosComponent } from './datos/datos.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { PaypalComponent } from './paypal/paypal.component';
import { environment } from '../environments/environment';
import { LaflotaComponent } from './laflota/laflota.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




import { AngularFireModule } from '@angular/fire';



import { TrasaccionOkComponent } from './trasaccion-ok/trasaccion-ok.component';
import { TrasaccionErrorComponent } from './trasaccion-error/trasaccion-error.component';


import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { MailService } from './service/mail.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginGoogleComponent } from './login-google/login-google.component';



@NgModule({
  declarations: [
    AppComponent,
    DatosComponent,
    LandingComponent,
    PaypalComponent,
    TrasaccionOkComponent,
    TrasaccionErrorComponent,
    LaflotaComponent,
    HeaderComponent,
    FooterComponent,
    LoginGoogleComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
     HttpClientModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'My-Xsrf-Cookie',
    headerName: 'X-Access-Key',
  }),
     AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
