import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PATH } from './app.config';
import { Customer } from './models/customer.model';

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

  @Input() datos!: string;

  imagePath!: string;

  datosCliente = signal<Customer | undefined>(undefined);

  constructor(
    @Inject(PATH) private path: string
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos']) {
      this.datosCliente.set(JSON.parse(this.datos));
    }
  }

  ngOnInit(): void {
    console.log('prueba');
    this.imagePath = `${this.path}assets/logo.png`;
  }
}
