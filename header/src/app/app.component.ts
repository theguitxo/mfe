import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @Input() path!: string;

  imagePath!: string;

  ngOnInit(): void {
    this.imagePath = `${this.path}/assets/logo.png`;
  }
}
