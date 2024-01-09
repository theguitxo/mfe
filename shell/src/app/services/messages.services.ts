import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public id!: string;

  constructor() {
    this.id = `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
  }
}
