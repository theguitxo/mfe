import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';

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
  template: ''
})
export class WrapperComponent implements OnInit {
  elm = inject(ElementRef);

  @Input() config = initWrapperConfig;
  
  async ngOnInit() {
    const { elementName, exposedModule, remoteName } = this.config;

    await loadRemoteModule(remoteName, exposedModule);
    const root = document.createElement(elementName);
    this.config?.attributes?.forEach((attr: WrapperAttribute) => {
      root.setAttribute(attr.name, attr.value);
    });
    this.elm.nativeElement.appendChild(root);
  }
}