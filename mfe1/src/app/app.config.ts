import { ApplicationConfig, InjectionToken, LOCALE_ID, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEs, 'es-ES');

export const PATH = new InjectionToken<string>('PATH');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true
    }),
    {
      provide: PATH,
      useFactory: () => isDevMode() ? 'http://localhost:4201/' : 'https://theguitxo.github.io/mfe/mfe1/'
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    importProvidersFrom([BrowserAnimationsModule])
  ]
};
