import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { customerState } from "../store/customers/customers.selectors";
import { Store } from "@ngrx/store";
import { CustomerState } from "../models/customer.model";
import { loadCustomers } from "../store/customers/customers.actions";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.comopnent.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  store = inject(Store<CustomerState>);
  
  ngOnInit(): void {
    this.store.dispatch(loadCustomers());
  }
  
  
}
