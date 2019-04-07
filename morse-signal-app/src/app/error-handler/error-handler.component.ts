import { Component, OnInit } from '@angular/core';
import {ErrorService} from '../services/error.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
  errorMessage: string[];
  fontSize: number;

  constructor(private errorService: ErrorService,
              private dataService: DataService) {

    this.dataService.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
    this.errorService.currentErrors.subscribe(error => this.errorMessage = error);
  }

  ngOnInit() {}

  removeError(error: string) {
    this.errorService.removeError(error);
  }
}
