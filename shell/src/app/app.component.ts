import { Component, ElementRef, NgZone, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { shareNgZone } from '@angular-architects/module-federation-tools';
import { WrapperComponent, WrapperConfig } from './wrapper-component/wrapper.component';
import { RouterOutlet } from '@angular/router';
import { MessagesService } from './services/messages.services';

export interface MessageData {
  selector: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages = inject(MessagesService);
  element = inject(ElementRef);

  headerConfig: WrapperConfig = {
    remoteName: 'header',
    exposedModule: './mfe-header',
    elementName: 'mfe-header',
    attributes: [
      {
        name: 'path',
        value: 'http://localhost:4202'
      },
      {
        name: 'message-event',
        value: 'messageEmited'
      }
    ]
  };

  footerConfig: WrapperConfig = {
    remoteName: 'footer',
    exposedModule: './mfe-footer',
    elementName: 'mfe-footer'
  };
  
  message = signal<MessageData>({
    selector: ''
  });

  constructor(
    private ngZone: NgZone
  ) {
    shareNgZone(ngZone);
  }

  ngOnInit(): void {
    this.element.nativeElement.addEventListener('messageEmited', (data: Event) => console.log(data))
  }

  navigate(route: string): void {
    window.history.replaceState(null, '', route);
    const popStateEvent = new PopStateEvent('popstate', {state: null});
    dispatchEvent(popStateEvent);
  }

  sendMessage(): void {
    this.message.set({
      selector: 'mfe-header'
    });
  }
}
