import { createApplication } from "@angular/platform-browser"
import { appConfig } from "./app/app.config"
import { createCustomElement } from "@angular/elements";
import { AppComponent } from "./app/app.component";


(async () => {
  const app = await createApplication(appConfig);
  const mfeFooter = createCustomElement(AppComponent, {
    injector: app.injector
  });
  customElements.define('mfe-footer', mfeFooter);
})();
