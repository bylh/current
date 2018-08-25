import { AppService } from './app.service';

import { Component, AfterViewInit, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(appService: AppService) {
    console.log('app: ', appService.isLogined());
  }
}
