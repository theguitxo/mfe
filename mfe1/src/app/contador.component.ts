import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mfe1-contador',
  template: `
    <div>contador</div>
    <div>valor: {{ value }}</div>
    <div><button (click)="update(-1)">-</button>&nbsp;<button (click)="update(1)">+</button></div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContadorComponent {
  value = 0;

  update(val: number): void {
    this.value += val;
  }
}