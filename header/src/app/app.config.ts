import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';

export const PATH = new InjectionToken<string>('PATH');

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: PATH,
      useFactory: () => isDevMode() ? 'http://localhost:4202/' : 'https://theguitxo.github.io/mfe/header/'
    }
  ]
};
