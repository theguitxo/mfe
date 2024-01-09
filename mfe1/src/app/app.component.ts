import { ChangeDetectionStrategy, Component, OnInit, inject, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { connectRouter } from './connect-router';
import { PATH } from './app.config';
import { Store } from '@ngrx/store';
import { CustomerState } from './models/customer.model';
import { loadCustomers } from './store/customers.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  path = inject(PATH);
  store = inject(Store<CustomerState>);

  constructor() {
    connectRouter();

    console.log(isDevMode());
    // this.loadCustomers();
    console.log(this.path);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCustomers());
  }
  
  async loadCustomers() {
    await fetch('../asssets/json/customers').then(a => console.log(a));
  }
}
