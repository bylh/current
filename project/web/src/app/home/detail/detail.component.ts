import { DBService } from './../../db.service';
import { Location } from '@angular/common';
import { HomeService, Article } from './../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PreviewEditorComponent } from '../preview-editor/preview-editor.component';
import { AuthService } from '../../auth.service';

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

  constructor(
    public dbService: DBService,
    private homeService: HomeService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loaction: Location,
    public editDialog: MatDialog) {
    this.route.paramMap.subscribe((params => {
      this.id = +params.get('id');
      console.log('detail id: ', this.id);
    }));
    this.route.queryParamMap.subscribe(params => {
      this.link = params.get('link');
      this.articleId = params.get('articleId');
    })
  }

  async ngOnInit() {
    console.log('detail');
    try {
      this.article = await this.homeService.getArticle(this.articleId);
      console.log('hello', await this.dbService.get('hello') );
      (this.preview.nativeElement as Element).innerHTML = this.article.html;
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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != null) {
        (this.preview.nativeElement as Element).innerHTML = result;
        this.article.html = result;
      }
    });
  }
}
