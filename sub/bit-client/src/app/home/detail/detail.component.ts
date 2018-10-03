
import { Location } from '@angular/common';
import { HomeService, Article } from './../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PreviewEditorComponent } from '../preview-editor/preview-editor.component';

import Viewer from 'tui-editor/dist/tui-editor-Viewer';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild('preview') preview: ElementRef;

  public id: number;
  public articleId: string;
  public link: string;
  public article: Article;

  public previewEdit: Viewer;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private loaction: Location,
    public snackBar: MatSnackBar,
    public editDialog: MatDialog) {
    this.route.paramMap.subscribe((params => {
      this.id = +params.get('id');
      console.log('detail id: ', this.id);
    }));
    this.route.queryParamMap.subscribe(params => {
      this.link = params.get('link');
      this.articleId = params.get('articleId');
      console.log('articleId: ', this.articleId);
    })
  }

  async ngOnInit() {
    console.log('detail', Viewer);
    try {
      this.article = await this.homeService.getArticle(this.articleId);
      console.log(this.article);
      // this.previewEdit = Editor.factory({
      //   el: this.preview.nativeElement,
      //   viewer: true,
      //   initialValue: this.article.md,
      //   height: '100%',
      //   width: '100%'
      // });
      this.previewEdit = new Viewer({
          el: this.preview.nativeElement,
          initialValue: this.article.md,
          height: '100%',
          width: '100%'
        });
      // if(this.article.md == null && this.article.html != null) { // md 为null但是html存在则显示
      //   (this.preview.nativeElement as Element).innerHTML = this.article.html;
      // }
      this.previewEdit.setHtml(this.article.html);
      
    } catch(err) {
    }
  }
  back() {
    // this.router.navigate(['tabs/home']);
    this.loaction.back();
  }
  goPage(url: string) {
    this.router.navigate([url]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return confirm('确定离开？');
  }

  edit(): void {

    const dialogRef = this.editDialog.open(PreviewEditorComponent, {
      height: '100%',
      width: '100%',
      data:this.article
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article != null) { // 取消返回null
        // (this.preview.nativeElement as Element).innerHTML = result;
        this.article = article;
        this.previewEdit.setMarkdown(this.article.md);
      }
    });
  }
  async removeArticle(event: Event) {
    // 避免默认处理和向外扩散
    event.stopPropagation();
    event.preventDefault();
    if(!window.confirm('确定删除')) return;
    try {
      await this.homeService.removeArticle(this.articleId);
      this.snackBar.open('删除文章成功');
      this.back();
    } catch(err) {
      console.log('错误', err);
      this.snackBar.open('删除文章');
    }
  }
}