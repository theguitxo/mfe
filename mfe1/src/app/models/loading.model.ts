import { Observable } from "rxjs";

export interface LoadingSelectors {
  loading: Observable<boolean>,
  loaded: Observable<boolean>,
  error: Observable<boolean>
}
