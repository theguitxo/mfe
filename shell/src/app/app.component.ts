import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { shareNgZone } from '@angular-architects/module-federation-tools';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

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
