import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public router: Router, public location: Location) { }

  ngOnInit() {
  }
  goPage(url: string) {
    this.router.navigateByUrl(url);
  }
  back() {
    this.location.back();
  }

}
