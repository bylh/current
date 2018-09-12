import { HomeService } from './../home.service';
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

  protected previewHtml: string;

  public id: number;
  public link: string;

  constructor(
    private homeService: HomeService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public editDialog: MatDialog) {
  }

  ngOnInit() {
    console.log('detail');
    this.route.paramMap.subscribe((params => {
      this.id = +params.get('id');
      console.log('detail id: ', this.id);
    }));
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('link'));
      this.link = params.get('link');
    })
    this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
  }
  back() {
    this.router.navigateByUrl('tabs/home');
  }
  goPage(url: string) {
    this.router.navigateByUrl(url);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return confirm('确定离开？');
  }

  edit(): void {

    const dialogRef = this.editDialog.open(PreviewEditorComponent, {
      height: '100%',
      width: '100%',
      data: {
        userId: this.auth.getUserId(),
        id: null,
        html: null,
        title: null,
        description: null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != null) {
        (this.preview.nativeElement as Element).innerHTML = result;
        this.previewHtml = result;
      }
    });
  }
}
