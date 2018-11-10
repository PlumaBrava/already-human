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
  { path: 'labelList', component: LabelListComponent },
  { path: 'labelCrear', component: LabelCrearComponent },
  { path: 'publish', component: PublishAlbumComponent },
  { path: 'trackList', component: TrackListComponent },
  { path: 'trackCrear', component: TrackCrearComponent }
  // ,
  // { path: 'datos', component: DatosComponent },

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }