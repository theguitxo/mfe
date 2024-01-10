import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "../../models/customer.model";

export const customerState = createFeatureSelector<CustomerState>('customers');

export const selectCanLoadCustomer = createSelector(
  customerState,
  (state): boolean => {
    console.log(state);
    return true;
  }
)