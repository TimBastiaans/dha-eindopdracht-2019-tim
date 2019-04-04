import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSource = new BehaviorSubject<string[]>(['']);
  currentErrors = this.errorSource.asObservable();


  constructor() { }

  addError(error: string) {
    const newError = this.errorSource.getValue();
    newError.push(error);
    this.errorSource.next(newError);
  }
}
