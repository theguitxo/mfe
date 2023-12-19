
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'prueba-component',
  template: '<div>es una prueba</div>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PruebaComponent {}