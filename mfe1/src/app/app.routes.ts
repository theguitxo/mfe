import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { provideState } from '@ngrx/store';
import { customerReducer } from './store/customers/customers.reducers';
import { provideEffects } from '@ngrx/effects';
import * as customerEffects from './store/customers/customers.effects';

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
    path: '**',
    component: HomeComponent
  }
];
