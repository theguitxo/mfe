import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PATH } from "../../app.config";
import { inject } from '@angular/core';
import { loadProducts, loadProductsKO, loadProductsOK } from './products.actions';
import { catchError, delay, exhaustMap, from, map, of } from 'rxjs';
import { Product } from '../../models/products.model';

export const loadProductsEffect = createEffect(
  (action = inject(Actions), path = inject(PATH)) => {
    return action.pipe(
      ofType(loadProducts),
      exhaustMap(() => from(fetch(`${path}assets/json/products.json`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())).pipe(
        delay(2000),
        map((products: Product[]) => loadProductsOK({products, path})),
        catchError(() => of(loadProductsKO()))
      ))
    )
  },
  { functional: true }
);
