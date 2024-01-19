import { createReducer, on } from "@ngrx/store";
import { ProductState } from "../../models/products.model";
import { loadProducts, loadProductsKO, loadProductsOK, reloadData } from "./products.actions";

export const initialState: ProductState = {
  products: [],
  loading: false,
  loaded: false,
  errorLoading: false
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    products: [],
    loading: true,
    loaded: false,
    errorLoading: false
  })),
  on(loadProductsOK, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    loaded: true
  })),
  on(loadProductsKO, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    errorLoading: false,
    products: []
  })),
  on(reloadData, (state) => ({
    ...state,
    products: [],
    loading: false,
    loaded: false,
    errorLoading: false
  }))
);
