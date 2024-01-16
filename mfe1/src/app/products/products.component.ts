import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, inject } from '@angular/core';
import { ProductState } from '../models/products.model';
import { Store } from '@ngrx/store';
import { selectCanLoadProducts } from '../store/products/products.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private injector = inject(Injector);
  private store = inject(Store<ProductState>);
  private destroyRef = inject(DestroyRef);

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
  }
}
