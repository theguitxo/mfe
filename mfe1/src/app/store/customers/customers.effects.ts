import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadCustomers, loadCustomersKO, loadCustomersOK } from './customers.actions';
import { catchError, delay, exhaustMap, from, map, of } from 'rxjs';
import { PATH } from '../../app.config';
import { Customer } from '../../models/customer.model';

export const loadCustomersEffect = createEffect(
  (actions$ = inject(Actions), path$ = inject(PATH)) => {
    return actions$.pipe(
      ofType(loadCustomers),
      exhaustMap(() => from(fetch(`${path$}assets/json/customers.json`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())).pipe(
        delay(2000),
        map((customers: Customer[]) => loadCustomersOK({customers})),
        catchError(() => of(loadCustomersKO()))
      ))
    )
  },
  { functional: true }
);
