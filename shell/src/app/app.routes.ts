import { Routes } from '@angular/router';
import { WrapperComponent, WrapperConfig } from './wrapper-component/wrapper.component';
import { startsWith } from './starts-with';

export const routes: Routes = [
  {
    matcher: startsWith('mfe1'),
    component: WrapperComponent,
    data: {
      config: {
        remoteName: 'mfe1',
        exposedModule: './web-components',
        elementName: 'mfe1-root'
      } as WrapperConfig
    },
  }
];
