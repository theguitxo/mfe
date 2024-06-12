import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
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
  styleUrl: './wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit, OnChanges {
  messages = inject(MessagesService);
  elm = inject(ElementRef);
  loading = signal(true);

  @Input() config = initWrapperConfig;
  @Input() message!: MessageData;

  @Output() loaded: EventEmitter<void> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    
    if (!(changes['message']?.firstChange)) {
      console.log(changes);
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
    this.loading.set(false);
    this.elm.nativeElement.appendChild(root);
    this.loaded.emit();
    this.messages.wrapperIsLoaded(this.config.remoteName);
  }

  private checkMessage(): void {
    console.log(this.message);
    if (this.message?.selector === this.config.elementName) {
      console.log('process message');
    }
  }
}