import { createAction, props } from "@ngrx/store";
import { Customer } from "../../models/customer.model";

export const loadCustomers = createAction(
  '[Customers] Load',
);

export const loadCustomersOK = createAction(
  '[Customers] Load OK',
  props<{ customers: Customer[] }>()
);

export const loadCustomersKO = createAction(
  '[Customers] Load KO'
);

export const reloadData = createAction(
  '[Customers] Reload data'
);
