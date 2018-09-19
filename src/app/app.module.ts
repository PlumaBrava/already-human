import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatosComponent } from './datos/datos.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { PaypalComponent } from './paypal/paypal.component';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    AppComponent,
    DatosComponent,
    LandingComponent,
    PaypalComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
