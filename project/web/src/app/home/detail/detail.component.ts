import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public id: number;

  fileUpload: any;
  html = `<h2>显示图片</h2>`;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log('detail');
    this.route.paramMap.subscribe((params => {
      this.id = +params.get('id');
      console.log('detail id: ', this.id);
    }));
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('info'));
    })
    this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
  }
  back() {
    this.router.navigate(['tabs/home', {backId: this.id}]);
  }
  goPage(url: string) {
    this.router.navigateByUrl(url);
  }
  getImg(event) {
    this.fileUpload = window.URL.createObjectURL(event.srcElement.files[0]);

    console.log('url:', this.fileUpload);
  }

}
