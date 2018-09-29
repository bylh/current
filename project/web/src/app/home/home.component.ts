import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { HomeService, Article } from './home.service';
import { PreviewEditorComponent } from './preview-editor/preview-editor.component';
import { AuthService } from '../auth.service';
import { merge, Subject } from 'rxjs';

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

  refreshSubject: Subject<string> = new Subject<string>();
  articles: Array<Article>;

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
    { title: 'webwork使用教程', discription: '', imgUrl: 'https://bit.bylh.top/avatars/img1.jpg', link: '//www.ruanyifeng.com/blog/2018/07/web-worker.html' },
    { title: '浏览器数据库 IndexedDB 入门教程', discription: '', imgUrl: '../assets/thumbs/item2.jpg', link: '//www.ruanyifeng.com/blog/2018/07/indexeddb.html' },
    { title: 'JavaScript 的 this 原理', discription: '', imgUrl: '../assets/thumbs/item3.jpg', link: '//www.ruanyifeng.com/blog/2018/06/javascript-this.html' },
    { title: 'purecss grid布局', discription: '', imgUrl: '../assets/thumbs/item4.jpg', link: 'https://purecss.io/grids/' },
    { title: '禁止iframe页面自动重定向跳转', discription: '', imgUrl: '../assets/thumbs/item5.jpg', link: '//blog.csdn.net/WKY_CSDN/article/details/71420490' }
  ];
  constructor(public homeService: HomeService,
    public authService: AuthService,
    public createArticleDialog: MatDialog,
    public snackBar: MatSnackBar,
    public location: Location,
    public router: Router,
    public route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      console.log('backId:', params.get('backId'));
    });
    this.location.subscribe(event => {
      console.log(event);
      if (event.url === '/tabs/home') {
        console.log(event.url, this.authService.getUserId())
        this.refreshSubject.next(this.authService.getUserId());
      }
    });
    this.router.events // 既然是ob为什么不支持filter等函数，应该是rxjs的升级
      .subscribe((event) => {
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

    merge(this.authService.getAuthSubject(), this.refreshSubject).subscribe(async (userId) => {
      console.log('收到subject', userId);
      if (userId != null) {
        try {
          this.articles = await this.homeService.getArticles();
          console.log('当前ids: ', this.articles);
        } catch (err) {
          console.log(err);
          this.snackBar.open('获取文章列表失败');
        }
      } else {
        console.log('登出置空数据');
        this.articles = null;
      }
    });
  }

  async ngOnInit() {
    console.log('ngOninit() : home init');
  }

  showScroll() {
    (this.home.nativeElement as Element).scrollTo(this.posX, this.posY);
  }

  createArticle(): void {
    const dialogRef = this.createArticleDialog.open(PreviewEditorComponent, {
      height: '100%',
      width: '100%',
      data: {
        userId: this.authService.getUserId(),
        title: null,
        description: null,
        html: null,
      } as Article
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.refreshSubject.next(this.authService.getUserId());
      }
    });
  }
  viewArticle(index: number) {
    console.log('文章详情页');
    this.router.navigate([`tabs/home/detail/${index}`], { queryParams: { 'articleId': this.articles[index]._id } });
  }
  async removeArticle(index: number, event: Event) {
    // 避免默认处理和向外扩散
    event.stopPropagation();
    event.preventDefault();
    try {
      await this.homeService.removeArticle(this.articles[index]._id);
      this.refreshSubject.next(this.authService.getUserId());
    } catch(err) {
      console.log('错误', err);
    }
  }
}
