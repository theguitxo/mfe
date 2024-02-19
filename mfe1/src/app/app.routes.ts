import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { customerReducer } from './store/customers/customers.reducers';
import { provideEffects } from '@ngrx/effects';
import * as customerEffects from './store/customers/customers.effects';
import { productsReducer } from './store/products/products.reducers';
import * as productEffects from './store/products/products.effects';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'mfe1/customers',
    component: CustomersComponent,
    providers: [
      provideState({ name: 'customers', reducer: customerReducer }),
      provideEffects(customerEffects)
    ]
  },
  {
    path: 'mfe1/products',
    component: ProductsComponent,
    providers: [
      provideState({ name: 'products', reducer: productsReducer }),
      provideEffects(productEffects)
    ]
  },
  {
    path: '**',
    component: HomeComponent
  }
];
