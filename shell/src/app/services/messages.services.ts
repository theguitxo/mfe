import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private _wrapperLoaded: Subject<string> = new Subject();

  wrapperLoaded = this._wrapperLoaded.asObservable();

  wrapperIsLoaded(id: string): void {
    this._wrapperLoaded.next(id);
  }
}
