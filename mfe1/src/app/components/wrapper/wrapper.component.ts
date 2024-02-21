import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnChanges, Output, Signal, inject } from '@angular/core';
import { LoadingSelectors } from '../../models/loading.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnChanges {
  @Input() selectors!: LoadingSelectors;

  @Output() reloadData: EventEmitter<void> = new EventEmitter();

  private injector = inject(Injector);

  loading!: Signal<boolean>;
  loaded!: Signal<boolean>;
  error!: Signal<boolean>;

  ngOnChanges(): void {
    if (!!this.selectors?.loading) {
      this.loading = toSignal(this.selectors.loading, { requireSync: true, injector: this.injector });
    }
    if (!!this.selectors?.loaded) {
      this.loaded = toSignal(this.selectors.loaded, { requireSync: true, injector: this.injector });
    }
    if (!!this.selectors?.error) {
      this.error = toSignal(this.selectors.error, { requireSync: true, injector: this.injector });
    }
  }

  reload(): void {
    this.reloadData.emit();
  }
}