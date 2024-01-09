import { Routes } from '@angular/router';
import { PruebaComponent } from './prueba.component';
import { ContadorComponent } from './contador.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'mfe1/prueba',
    component: PruebaComponent
  },
  {
    path: 'mfe1/contador',
    component: ContadorComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];
