import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ErrorService} from '../services/error.service';
import {DataService} from '../services/data.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
  errorMessage: string[];
  fontSize: number;
  @Input() dateOfToday: Date;
  @Output() close: EventEmitter<string> = new EventEmitter();

  constructor(private errorService: ErrorService,
              private dataService: DataService,
              public platform: Platform) {

    this.dataService.currentFontSize.subscribe(fontSize => this.fontSize = fontSize);
    this.errorService.currentErrors.subscribe(error => this.errorMessage = error);
  }

  ngOnInit() {}

  removeError2(error: string) {
    this.errorService.removeError(error);
  }

  removeError(error: string) {
    this.close.emit(error);
  }
}

