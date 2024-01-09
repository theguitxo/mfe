import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MessagesService } from '../services/messages.services';
import { MessageData } from '../app.component';

export interface WrapperAttribute {
  name: string;
  value: string;
}
export interface WrapperConfig {
  remoteName: string;
  exposedModule: string;
  elementName: string;
  attributes?: WrapperAttribute[];
}

export const initWrapperConfig: WrapperConfig = {
  remoteName: '',
  exposedModule: '',
  elementName: ''
};

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit, OnChanges {
  messages = inject(MessagesService);
  loading = true;
  elm = inject(ElementRef);

  @Input() config = initWrapperConfig;
  @Input() message!: MessageData;

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['message'] && !changes['message'].firstChange) {
      this.checkMessage();
    }
  }

  async ngOnInit() {
    const { elementName, exposedModule, remoteName } = this.config;

    await loadRemoteModule(remoteName, exposedModule);
    const root = document.createElement(elementName);
    this.config?.attributes?.forEach((attr: WrapperAttribute) => {
      root.setAttribute(attr.name, attr.value);
    });
    this.loading = false;
    this.elm.nativeElement.appendChild(root);
  }

  private checkMessage(): void {
    if (this.message.selector === this.config.elementName) {
      console.log('process message');
    }
  }
}