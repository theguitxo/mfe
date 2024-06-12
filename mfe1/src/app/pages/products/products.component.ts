import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterRenderPhase, AfterRenderRef, AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnDestroy, OnInit, QueryList, Renderer2, Signal, ViewChild, ViewChildren, afterRender, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs/operators';
import { Product, ProductState } from '../../models/products.model';
import { selectCanLoadProducts, selectIsLoading, selectProducts, selectShowError, selectShowLoadedData } from '../../store/products/products.selectors';
import { loadProducts, reloadData } from '../../store/products/products.actions';
import { LoadingSelectors } from '../../models/loading.model';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, WrapperComponent],
  templateUrl: './products.component.html',
  styleUrls: ['../../app.scss', './products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper') wrapperRef!: ElementRef;
  @ViewChild('carrousel') carrouselRef!: ElementRef;
  @ViewChildren('productitem') productItemsRef!: QueryList<ElementRef>;

  private store = inject(Store<ProductState>);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private element = inject(ElementRef);

  private afterRenderRef!: AfterRenderRef;

  errorLoading!: Signal<boolean>;
  products!: Signal<Product[]>;

  wrapperSize!: number;
  carrouselSize!: number;
  productItemSize!: number;

  movementIndex = signal<number>(0);
  showRightArrow!: Signal<boolean>;
  showLeftArrow!: Signal<boolean>;

  resizeObserver!: ResizeObserver;
  resizeTimer!: any;

  loadingSelectors!: LoadingSelectors;

  ngOnInit(): void {
    this.initSubscriptions();
    this.initResizeObserver();
  }

  ngOnDestroy(): void {
    if(this.afterRenderRef) {
      this.afterRenderRef.destroy();
    }
    this.resizeObserver.unobserve(this.document.body);
    clearTimeout(this.resizeTimer);
  }

  ngAfterViewInit(): void {
    this.afterRenderRef = afterRender(() => this.setElementsSizes(), {
      phase: AfterRenderPhase.Read,
      injector: this.injector
    });
  }

  moveProductItem(movement: number): void {
    this.movementIndex.update((current) => current - movement);
    this.renderer.setStyle(this.carrouselRef.nativeElement, 'transform', `translateX(${this.productItemSize * this.movementIndex()}px)`);
  }

  selectProduct(product: Product): void {
    this.element.nativeElement
      .dispatchEvent(new CustomEvent('productSelect', {
        bubbles: true,
        detail: { product }
    }));
  }

  initSubscriptions(): void {
    this.store.select(selectCanLoadProducts)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(value => value),
        tap(() => this.store.dispatch(loadProducts()))
      ).subscribe();

    this.loadingSelectors = {
      loading: this.store.select(selectIsLoading),
      error: this.store.select(selectShowError),
      loaded: this.store.select(selectShowLoadedData)
    };

    this.products = toSignal(this.store.select(selectProducts), { requireSync: true, injector: this.injector });
    this.showRightArrow = computed(() => this.movementIndex() < 0);
    this.showLeftArrow = computed(() => this.movementIndex() > (this.products().length - 2) * -1);
  }

  private initResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setElementsSizes();
      }, 100);
    });

    this.resizeObserver.observe(this.document.body);
  }

  private setElementsSizes(): void {
    if(this.productItemsRef.first?.nativeElement) {
      this.wrapperSize = this.wrapperRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
      this.carrouselSize = Math.floor(this.carrouselRef?.nativeElement?.getBoundingClientRect()?.width ?? 0);
      this.productItemSize =
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).width) +
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).paddingLeft) +
        parseFloat(getComputedStyle(this.productItemsRef?.first?.nativeElement).paddingRight);
    }

    if (!!this.wrapperSize && !!this.carrouselSize && !!this.productItemSize && !!this.afterRenderRef) {
      this.afterRenderRef.destroy();
    }
  }

  reloadData(): void {
    this.store.dispatch(reloadData());
  }
}
