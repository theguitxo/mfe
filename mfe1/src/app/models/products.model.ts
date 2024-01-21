export interface Product {
  image: string;
  code: string;
  description: string;
}

export interface ProductState {
  loading: boolean;
  loaded: boolean;
  errorLoading: boolean;
  products: Product[];
}

