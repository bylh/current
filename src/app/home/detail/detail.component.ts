import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public id: number;

  public link: string;
  fileUpload: any = null;
  html = `<h2>显示图片</h2>`;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
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
    this.router.navigate(['tabs/home']);
  }
  goPage(url: string) {
    this.router.navigateByUrl(url);
  }
  getImg(event) {
    this.fileUpload = window.URL.createObjectURL(event.srcElement.files[0]);

    console.log('url:', this.fileUpload);
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (this.fileUpload == null) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    // return this.dialogService.confirm('Discard changes?');
    
    return confirm('确定离开？');
  }

}
