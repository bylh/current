import { HomeService } from './home.service';
import { environment } from '../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import axios from 'axios';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('home') home: ElementRef;
  protected posX: number = 0;
  protected posY: number = 0;
  isLogined: boolean = false;
  fileUpload: any;
  html = `<h2>显示图片</h2>`;
  constructor(public appService: AppService, public homeService: HomeService, public snackBar: MatSnackBar, public router: Router, public route: ActivatedRoute) {
    // console.log('home is active?', this.router.isActive('/home', true));
    this.route.paramMap.subscribe(params => {
      // console.log('backId:', params.get('backId'));
    });

    this.router.events // 既然是ob为什么不支持filter等函数，暂时不明确
      .subscribe((event: Event) => {
        // console.log('navi Event: ', event);
        if(event instanceof NavigationEnd) {
          // console.log('NavigationEnd Event: ', event);
          if(event.url === '/home') {
            this.showScroll();
          }
        }
        if(event instanceof NavigationStart) {
          if(event.url != '/home') {
            this.posY = this.home.nativeElement.scrollTop;
            this.posX = this.home.nativeElement.scrollLeft;
            console.log(this.posX, this.posY, event.url);
          }
        }
      });

    this.isLogined = appService.isLogined();
    appService.getAuthStateOb().subscribe((user) => {
      this.isLogined = user != null;
    });
    console.log('constructor(): home start');
  }

  ngOnInit() {
    console.log('ngOninit() : home init');
  }
  getImg(event) {
    this.fileUpload = window.URL.createObjectURL(event.srcElement.files[0]);

    console.log('url:', this.fileUpload);
  }
  showScroll() {
    (this.home.nativeElement as Element).scrollTo(this.posX, this.posY);
  }
}
