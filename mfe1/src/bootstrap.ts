import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

(async () => {
  const app = await createApplication(appConfig);

  const mfe1Root = createCustomElement(AppComponent, {
    injector: app.injector
  });

  customElements.define('mfe1-root', mfe1Root);
})();