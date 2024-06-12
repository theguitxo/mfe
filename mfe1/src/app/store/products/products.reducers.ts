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
  on(loadProductsOK, (state, { products, path }) => ({
    ...state,
    products: products.map((item) => ({
      ...item,
      image: `${path}${item.image}`
    })),
    loading: false,
    loaded: true
  })),
  on(loadProductsKO, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    errorLoading: true,
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
