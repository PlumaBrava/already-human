import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { ArtistaslistComponent } from './artistas/artistaslist/artistaslist.component';
import { ArtistascrearComponent } from './artistas/artistascrear/artistascrear.component';
import { ArtistasmodificarComponent } from './artistas/artistasmodificar/artistasmodificar.component';
import { LabelListComponent } from './label/label-list/label-list.component';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { LabelCrearComponent } from './label/label-crear/label-crear.component';
import { AlbumCrearComponent } from './album/album-crear/album-crear.component';
import { PublishAlbumComponent } from './publish/publish-album/publish-album.component';
import { TrackListComponent } from './track/track-list/track-list.component';
import { TrackCrearComponent } from './track/track-crear/track-crear.component';

import { TrackObjectComponent } from './track/track-object/track-object.component';
import { TrackListAddComponent } from './track/track-list-add/track-list-add.component';



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
    LoginGoogleComponent,
    ArtistaslistComponent,
    ArtistascrearComponent,
    ArtistasmodificarComponent,
    LabelListComponent,
    AlbumListComponent,
    LabelCrearComponent,
    AlbumCrearComponent,
    PublishAlbumComponent,
    TrackListComponent,
    TrackCrearComponent,

    TrackObjectComponent,

    TrackListAddComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
     HttpClientModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'My-Xsrf-Cookie',
    headerName: 'X-Access-Key',
  }),
     AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [MailService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
