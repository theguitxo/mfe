import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges {
  element = inject(ElementRef);

  @Input() path!: string;
  @Input() messageEvent!: string;

  imagePath!: string;

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

  ngOnInit(): void {
    this.imagePath = `${this.path}/assets/logo.png`;
  }

  sendMessage(): void {
    this.element.nativeElement.
    dispatchEvent(new CustomEvent(this.messageEvent, {
      bubbles: true,
      detail: {
        element: this.element.nativeElement.tagName,
        value: 'message from header'
      }
    }));
  }
}
