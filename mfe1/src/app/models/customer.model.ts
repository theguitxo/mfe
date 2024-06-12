export interface Customer {
  nif: string;
  name: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface CustomerState {
  loading: boolean;
  loaded: boolean;
  errorLoading: boolean;
  customers: Customer[];
}
