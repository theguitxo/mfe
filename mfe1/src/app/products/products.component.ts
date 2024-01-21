import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnInit, QueryList, Signal, ViewChild, ViewChildren, inject } from '@angular/core';
import { Product, ProductState } from '../models/products.model';
import { Store } from '@ngrx/store';
import { selectCanLoadProducts, selectProducts } from '../store/products/products.selectors';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs/operators';
import { loadProducts } from '../store/products/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  @ViewChild('wrapper') wrapperRef!: ElementRef;
  @ViewChild('carrousel') carrouselRef!: ElementRef;
  @ViewChildren('productitem') productItemsRef!: QueryList<ElementRef>;

  private injector = inject(Injector);
  private store = inject(Store<ProductState>);
  private destroyRef = inject(DestroyRef);

  products!: Signal<Product[]>;

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.store.select(selectCanLoadProducts)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(value => value),
        tap(() => this.store.dispatch(loadProducts()))
      ).subscribe();

    this.products = toSignal(this.store.select(selectProducts), { requireSync: true, injector: this.injector });
  }
}
