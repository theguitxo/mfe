import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PATH } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges {
  element = inject(ElementRef);

  @Input() messageEvent!: string;

  imagePath!: string;

  constructor(
    @Inject(PATH) private path: string
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

  ngOnInit(): void {
    console.log(this.path);
    this.imagePath = `${this.path}assets/logo.png`;
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
