import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Customer, CustomerState } from "../../models/customer.model";

export const customerState = createFeatureSelector<CustomerState>('customers');

export const selectCanLoadCustomer = createSelector(
  customerState,
  (state: CustomerState): boolean => !state.loading && !state.loaded && !state.errorLoading
);

export const selectIsLoading = createSelector(
  customerState,
  (state: CustomerState): boolean => state.loading
);

export const selectShowLoadedData = createSelector(
  customerState,
  (state: CustomerState): boolean => !state.loading && state.loaded && !state.errorLoading
);

export const selectShowError = createSelector(
  customerState,
  (state: CustomerState): boolean => state.errorLoading
);

export const selectCustomers = createSelector(
  customerState,
  (state: CustomerState): Customer[] => state.customers
);
