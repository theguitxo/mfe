import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/products.model";

export const loadProducts = createAction(
  '[Products] Load',
);

export const loadProductsOK = createAction(
  '[Products] Load OK',
  props<{
    products: Product[],
    path: string
  }>()
);

export const loadProductsKO = createAction(
  '[Products] Load KO'
);

export const reloadData = createAction(
  '[Products] Reload data'
);
