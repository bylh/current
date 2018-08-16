import { HomeService } from './home.service';
import { environment } from '../../environments/environment';
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
  fileUpload: any;
  html = `<h2>显示图片</h2>`;
  constructor(public appService: AppService, public homeService: HomeService, public snackBar: MatSnackBar) {
    this.isLogined = appService.isLogined();
    appService.getAuthStateOb().subscribe((user) => {
      this.isLogined = user != null;
    })
  }

  ngOnInit() {
    console.log('ngOninit() : home init');
  }
  getImg(event) {
    this.fileUpload = window.URL.createObjectURL(event.srcElement.files[0]);

    console.log('url:', this.fileUpload);
  }
}
