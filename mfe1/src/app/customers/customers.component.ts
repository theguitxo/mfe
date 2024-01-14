import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, Signal, computed, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Customer, CustomerState } from "../models/customer.model";
import { loadCustomers, reloadData } from "../store/customers/customers.actions";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectCanLoadCustomer, selectCustomers, selectIsLoading, selectShowError, selectShowLoadedData } from "../store/customers/customers.selectors";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  private injector = inject(Injector);
  private store = inject(Store<CustomerState>);
  private destroyRef = inject(DestroyRef);
  
  loading!: Signal<boolean>;
  showLoadedData!: Signal<boolean>;
  errorLoading!: Signal<boolean>;
  customers!: Signal<Customer[]>;

  page = signal<number>(0);
  itemsPage = 3;
  totalPages!: Signal<number>;
  customerList!: Signal<Customer[]>;
  pages!: Signal<number[]>;
  finalPage!: Signal<number>;

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {

    this.store.select(selectCanLoadCustomer)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(loadCustomers());
        }
      });

    this.loading = toSignal(this.store.select(selectIsLoading), { requireSync: true, injector: this.injector });
    this.showLoadedData = toSignal(this.store.select(selectShowLoadedData), { requireSync: true, injector: this.injector });
    this.customers = toSignal(this.store.select(selectCustomers), { requireSync: true, injector: this.injector });
    this.totalPages = computed(() => Math.ceil(this.customers()?.length / this.itemsPage));
    this.pages = computed(() => new Array(this.totalPages())?.fill(0)?.map((_value, index) => index));
    this.customerList = computed(() => this.customers()?.slice((this.page() * this.itemsPage), (this.page() * this.itemsPage) + this.itemsPage));
    this.finalPage = computed(() => this.totalPages() - 1);
    this.errorLoading = toSignal(this.store.select(selectShowError), { requireSync: true, injector: this.injector });
  }

  seleccionar(customer: Customer): void {
    console.log(customer);
  }

  changePage(page: number): void {
    this.page.set(page);
  }

  changeInitEnd(init = true): void {
    this.page.set(init ? 0 : this.finalPage());
  }

  movePage(dir: number): void {
    this.page.update(page => page + dir);
  }

  reloadData(): void {
    this.store.dispatch(reloadData());
  }
}
