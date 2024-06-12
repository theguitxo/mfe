import { createReducer, on } from "@ngrx/store";
import { CustomerState } from "../../models/customer.model";
import { loadCustomers, loadCustomersKO, loadCustomersOK, reloadData } from "./customers.actions";

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  loaded: false,
  errorLoading: false
};

export const customerReducer = createReducer(
  initialState,
  on(loadCustomers, (state) => ({
    ...state,
    customers: [],
    loading: true,
    loaded: false,
    errorLoading: false
  })),
  on(loadCustomersOK, (state, { customers }) => ({
    ...state,
    customers,
    loading: false,
    loaded: true
  })),
  on(loadCustomersKO, (state) => ({
    ...state,
    loading: false,
    errorLoading: true
  })),
  on(reloadData, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    errorLoading: false,
    customers: []
  }))
);
