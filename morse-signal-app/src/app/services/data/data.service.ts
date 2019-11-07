import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private fontSizeSource = new BehaviorSubject<number>(24);
  currentFontSize = this.fontSizeSource.asObservable();

  constructor() { }

  changeFontSize(size: number) {
    this.fontSizeSource.next(size);
  }
}
