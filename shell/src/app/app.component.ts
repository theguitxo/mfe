import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { shareNgZone } from '@angular-architects/module-federation-tools';
import { WrapperComponent, WrapperConfig } from './wrapper-component/wrapper.component';
import { RouterOutlet } from '@angular/router';
import { MessagesService } from './services/messages.services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export interface MessageData {
  selector: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  messages = inject(MessagesService);
  element = inject(ElementRef);
  destroyRef = inject(DestroyRef);

  showHeaderLinks = signal(false);

  frontsLoaded: Map<string, boolean> =
    new Map<string, boolean>()
      .set('mfe1', false)
      .set('header', false)
      .set('footer', false);

  headerConfig: WrapperConfig = {
    remoteName: 'header',
    exposedModule: './mfe-header',
    elementName: 'mfe-header',
    attributes: [
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
    this.element.nativeElement.addEventListener('messageEmited', (data: Event) => console.log(data));
    this.element.nativeElement.addEventListener('productSelect', (data: Event) => console.log(data));
    this.element.nativeElement.addEventListener('customerSelect', (data: Event) => console.log(data));

    this.messages
      .wrapperLoaded
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((id: string) => {
          this.frontsLoaded.set(id, true);
          this.showHeaderLinks.set(Array.from(this.frontsLoaded.values()).every(i => i));
        })).subscribe();
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('messageEmited');
    this.element.nativeElement.removeEventListener('productSelect');
    this.element.nativeElement.removeEventListener('customerSelect');
  }

  navigate(route: string): void {
    window.history.replaceState(null, '', route);
    const popStateEvent = new PopStateEvent('popstate', {state: null});
    dispatchEvent(popStateEvent);
  }
}
