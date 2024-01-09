import { createReducer, on } from "@ngrx/store";
import { CustomerState } from "../models/customer.model";
import { loadCustomers } from "./customers.actions";

export const initialState: CustomerState = {
  customers: []
};

export const customerReducer = createReducer(
  initialState,
  on(loadCustomers, state=> ({ ...state }))
);
