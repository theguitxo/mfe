import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { customerReducer } from './store/customers.reducers';

export const PATH = new InjectionToken<string>('PATH');

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = [debug];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      [customerReducer], 
      {
        runtimeChecks: {},
        metaReducers
      }
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
      connectInZone: true
    }),
    {
      provide: PATH,
      useFactory: () => isDevMode() ? 'http://localhost:4201/' : ''
    }
  ]
};
