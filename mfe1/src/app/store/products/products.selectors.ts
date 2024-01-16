import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product, ProductState } from "../../models/products.model";

export const productState = createFeatureSelector<ProductState>('products');

export const selectCanLoadProducts = createSelector(
  productState,
  (state: ProductState): boolean => !state.loading && !state.loaded && !state.errorLoading
);

export const selectIsLoading = createSelector(
  productState,
  (state: ProductState): boolean => state.loading
);

export const selectShowLoadedData = createSelector(
  productState,
  (state: ProductState): boolean => !state.loading && state.loaded && !state.errorLoading
);

export const selectShowError = createSelector(
  productState,
  (state: ProductState): boolean => state.errorLoading
);

export const selectProducts = createSelector(
  productState,
  (state: ProductState): Product[] => state.products
);
