import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'empty-component',
  template: '<div>Empty</div>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyComponent {}