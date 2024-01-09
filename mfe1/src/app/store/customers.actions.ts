import { createAction } from "@ngrx/store";

export const loadCustomers = createAction(
  '[Customers] Load',
);

export const loadCustomersOK = createAction(
  '[Customers] Load OK'
);

export const loadCustomersKO = createAction(
  '[Customers] Load KO'
);
