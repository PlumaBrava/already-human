// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './datos/datos.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
{ path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'datos/:id', component: DatosComponent }
  // ,
  // { path: 'datos', component: DatosComponent },

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }