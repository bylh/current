import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart } from '@angular/router';

import { HomeService } from './home.service';



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
  constructor(public homeService: HomeService, public snackBar: MatSnackBar, public router: Router, public route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      console.log('backId:', params.get('backId'));
    });

    this.router.events // 既然是ob为什么不支持filter等函数，应该是rxjs的升级
      .subscribe((event: Event) => {
        // console.log('navi Event: ', event);
        // if(event instanceof NavigationEnd) {
        //   // console.log('NavigationEnd Event: ', event);
        //   if(event.url === '/home') {
        //     this.showScroll();
        //   }
        // }
        // if(event instanceof NavigationStart) {
        //   if(event.url != '/home') {
        //     this.posY = this.home.nativeElement.scrollTop;
        //     this.posX = this.home.nativeElement.scrollLeft;
        //     console.log(this.posX, this.posY, event.url);
        //   }
        // }
      });
  }

  ngOnInit() {
    console.log('ngOninit() : home init');
  }
  showScroll() {
    (this.home.nativeElement as Element).scrollTo(this.posX, this.posY);
  }
}
