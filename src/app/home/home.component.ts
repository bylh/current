import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart } from '@angular/router';

import { HomeService } from './home.service';

export interface Tile {
  color?: string;
  cols?: number;
  rows?: number;
  text: string;
  url: string;
}

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

  tiles: Tile[] = [
    { text: '笔记', url: 'https://keep.google.com', cols: 1, rows: 1, color: 'lightblue' },
    { text: '工具', url: 'http://www.nicetool.net', cols: 1, rows: 1, color: 'lightyellow' },
    { text: '空投', url: 'https://airdropalert.com', cols: 1, rows: 1, color: 'lightgreen' },
    { text: '搜索', url: 'https://www.google.com', cols: 1, rows: 1, color: 'lightpink' },
    { text: '翻译', url: 'https://translate.google.cn/', cols: 1, rows: 1, color: '#DDBDF1' },
  ];
  items = [
    { title: 'webwork使用教程', discription: '', imgUrl: 'http://n.sinaimg.cn/translate/20170726/Zjd3-fyiiahz2863063.jpg', link: 'http://www.ruanyifeng.com/blog/2018/07/web-worker.html' },
    { title: '浏览器数据库 IndexedDB 入门教程', discription: '', imgUrl: 'http://www.gx8899.com/uploads/allimg/2017111809/qwcgbkrwxcw.jpg', link: 'http://www.ruanyifeng.com/blog/2018/07/indexeddb.html' },
    { title: 'JavaScript 的 this 原理', discription: '', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuon2K23nnYHCFIJElE_Z52hj1naQSrbhPAlhARX46YL3LXL1c', link: 'http://www.ruanyifeng.com/blog/2018/06/javascript-this.html' },
    { title: 'Node 定时器详解', discription: '', imgUrl: 'http://img.xiazaizhijia.com/uploads/2017/0825/20170825114525255.jpg', link: 'http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html' },
    { title: '禁止iframe页面自动重定向跳转', discription: '', imgUrl: 'http://hbimg.b0.upaiyun.com/4fb0d1d6c1046fdeebfccebb2c5d3ed6f1d68728328a-1BGoGh', link: 'https://blog.csdn.net/WKY_CSDN/article/details/71420490' }
  ];
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
