import { CommonModule } from '@angular/common';
import { AfterRenderPhase, AfterRenderRef, AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnDestroy, OnInit, QueryList, Renderer2, Signal, ViewChild, ViewChildren, afterRender, inject } from '@angular/core';
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
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper') wrapperRef!: ElementRef;
  @ViewChild('carrousel') carrouselRef!: ElementRef;
  @ViewChildren('productitem') productItemsRef!: QueryList<ElementRef>;

  private injector = inject(Injector);
  private store = inject(Store<ProductState>);
  private destroyRef = inject(DestroyRef);
  private renderer = inject(Renderer2);

  private afterRenderRef!: AfterRenderRef;

  products!: Signal<Product[]>;

  wrapperSize!: number;
  carrouselSize!: number;
  productItemSize!: number;

  movementIndex = 0;

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.afterRenderRef.destroy();
  }

  ngAfterViewInit(): void {
    this.afterRenderRef = afterRender(() => this.setElementsSizes(), {
      phase: AfterRenderPhase.Read,
      injector: this.injector
    });
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

  private setElementsSizes(): void {
    this.wrapperSize = this.wrapperRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this.carrouselSize = Math.floor(this.carrouselRef?.nativeElement?.getBoundingClientRect()?.width ?? 0);

    if(!!this.productItemsRef.first?.nativeElement) {
      this.productItemSize =
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).width) +
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).paddingLeft) +
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).paddingRight);
    }
  }

  moveProductItem(movement: number): void {
    console.log(this.wrapperSize);
    console.log(this.carrouselSize);
    console.log(this.productItemSize);
    this.movementIndex -= movement;

    this.renderer.setStyle(this.carrouselRef.nativeElement, 'transform', `translateX(${this.productItemSize * this.movementIndex}px)`);
  }
}
