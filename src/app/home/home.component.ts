import { HomeService } from './home.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogined: boolean = false;

  constructor(public appService: AppService, public homeService: HomeService, public snackBar: MatSnackBar) {
    this.isLogined = appService.isLogined();
    appService.getAuthStateOb().subscribe((user) => {
      this.isLogined = user != null;
    })
  }

  ngOnInit() {
  }
}
