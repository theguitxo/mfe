import { Routes } from '@angular/router';
import { PruebaComponent } from './prueba.component';
import { ContadorComponent } from './contador.component';
import { EmptyComponent } from './empty.component';

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
    component: EmptyComponent
  }
];
