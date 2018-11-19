// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './datos/datos.component';
import { LandingComponent } from './landing/landing.component';
import { LaflotaComponent } from './laflota/laflota.component';
import { ArtistaslistComponent } from './artistas/artistaslist/artistaslist.component';
import { ArtistascrearComponent } from './artistas/artistascrear/artistascrear.component';
import { ArtistasmodificarComponent } from './artistas/artistasmodificar/artistasmodificar.component';
import { LabelListComponent } from './label/label-list/label-list.component';
import { LabelCrearComponent } from './label/label-crear/label-crear.component';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { AlbumCrearComponent } from './album/album-crear/album-crear.component';
import { PublishAlbumComponent } from './publish/publish-album/publish-album.component';
import { TrackListComponent } from './track/track-list/track-list.component';
import { TrackCrearComponent } from './track/track-crear/track-crear.component';
import { TrackObjectComponent } from './track/track-object/track-object.component';
import { TrackListAddComponent } from './track/track-list-add/track-list-add.component';
import { NewuserComponent } from './newuser/newuser.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NewreleaseInfoComponent } from './newrelease-info/newrelease-info.component';
import { NewreleaseTracksComponent } from './newrelease-tracks/newrelease-tracks.component';
import { NewreleaseDistComponent } from './newrelease-dist/newrelease-dist.component';


const routes: Routes = [
{ path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'datos/:id', component: DatosComponent },
  { path: 'laflota', component: LaflotaComponent },
  { path: 'artistasList', component: ArtistaslistComponent },
  { path: 'artistasCrear', component: ArtistascrearComponent },
  { path: 'artistasModificar', component: ArtistasmodificarComponent },
  { path: 'albumList', component: AlbumListComponent },
  { path: 'albumCrear', component: AlbumCrearComponent },
  { path: 'albumCrear/:album_id', component: AlbumCrearComponent },
  { path: 'labelList', component: LabelListComponent },
  { path: 'labelCrear', component: LabelCrearComponent },
  { path: 'publish', component: PublishAlbumComponent },
  { path: 'trackList', component: TrackListComponent },
  { path: 'trackCrear', component: TrackCrearComponent },
  { path: 'trackObject', component: TrackObjectComponent },
  { path: 'tracklistadd', component: TrackListAddComponent},
  { path: 'newuser', component: NewuserComponent},
  { path: 'micuenta', component: MicuentaComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'userdetails', component: UserdetailsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'newrelease-info', component: NewreleaseInfoComponent},
  { path: 'newrelease-tracks', component: NewreleaseTracksComponent},
  { path: 'newrelease-dist', component: NewreleaseDistComponent},









  // ,
  // { path: 'datos', component: DatosComponent },

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }