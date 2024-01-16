export interface Product {
  path: string;
  code: string;
  description: string;
}

export interface ProductState {
  loading: boolean;
  loaded: boolean;
  errorLoadign: boolean;
  products: Product[];
}

