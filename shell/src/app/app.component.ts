import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { shareNgZone } from '@angular-architects/module-federation-tools';
import { WrapperComponent, WrapperConfig } from './wrapper.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  headerConfig: WrapperConfig = {
    remoteName: 'header',
    exposedModule: './mfe-header',
    elementName: 'mfe-header',
    attributes: [
      {
        name: 'path',
        value: 'http://localhost:4202'
      }
    ]
  };

  constructor(
    private ngZone: NgZone
  ) {
    shareNgZone(ngZone);
  }

  navigate(route: string): void {
    window.history.replaceState(null, '', route);
    const popStateEvent = new PopStateEvent('popstate', {state: null});
    dispatchEvent(popStateEvent);
  }
}
