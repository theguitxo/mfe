import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnInit, Signal, computed, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Customer, CustomerState } from "../../models/customer.model";
import { loadCustomers, reloadData } from "../../store/customers/customers.actions";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectCanLoadCustomer, selectCustomers, selectIsLoading, selectShowError, selectShowLoadedData } from "../../store/customers/customers.selectors";
import { filter, tap } from "rxjs/operators";
import { LoadingSelectors } from "../../models/loading.model";
import { WrapperComponent } from "../../components/wrapper/wrapper.component";
import { style, animate, trigger, transition } from "@angular/animations";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, WrapperComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['../../app.scss', './customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate('1s', style({opacity: 1}))
      ]) 
    ])
  ]
})
export class CustomersComponent implements OnInit {
  private store = inject(Store<CustomerState>);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private element = inject(ElementRef);
  
  customers!: Signal<Customer[]>;

  page = signal<number>(0);
  itemsPage = 3;
  totalPages!: Signal<number>;
  customerList!: Signal<Customer[]>;
  pages!: Signal<number[]>;

  showPreviousArrows!: Signal<boolean>;
  showNextArrows!: Signal<boolean>;

  loadingSelectors!: LoadingSelectors;
  
  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.store.select(selectCanLoadCustomer)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(value => value),
        tap(() => this.store.dispatch(loadCustomers()))
      ).subscribe();

    this.loadingSelectors = {
      loading: this.store.select(selectIsLoading),
      error: this.store.select(selectShowError),
      loaded: this.store.select(selectShowLoadedData)
    };

    this.customers = toSignal(this.store.select(selectCustomers), { requireSync: true, injector: this.injector });

    this.totalPages = computed(() => Math.ceil(this.customers()?.length / this.itemsPage));
    this.pages = computed(() => new Array(this.totalPages())?.fill(0)?.map((_value, index) => index));
    this.customerList = computed(() => this.customers()?.slice((this.page() * this.itemsPage), (this.page() * this.itemsPage) + this.itemsPage));

    this.showPreviousArrows = computed(() => this.page() > 0);
    this.showNextArrows = computed(() => this.page() < this.totalPages() - 1);
  }

  seleccionar(customer: Customer): void {
    this.element.nativeElement
      .dispatchEvent(new CustomEvent('customerSelect', {
        bubbles: true,
        detail: { customer }
      }));
  }

  changePage(page: number): void {
    this.page.set(page);
  }

  reloadData(): void {
    this.store.dispatch(reloadData());
  }
}
