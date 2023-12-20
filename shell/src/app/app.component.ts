import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { shareNgZone } from '@angular-architects/module-federation-tools';
import { WrapperComponent, WrapperConfig } from './wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  headerConfig: WrapperConfig = {
    remoteName: 'header',
    exposedModule: './mfe-header',
    elementName: 'mfe-header'
  }
  constructor(
    private ngZone: NgZone,
    private readonly router: Router
  ) {
    shareNgZone(ngZone);
  }

  navigate(route: string): void {
    location.replace(route);
  }
}
