import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import Editor from 'tui-editor';

@Component({
  selector: 'app-discovery-detail',
  templateUrl: './discovery-detail.component.html',
  styleUrls: ['./discovery-detail.component.scss']
})
export class DiscoveryDetailComponent implements OnInit {
  @ViewChild('editSection') editElementRef: ElementRef;

  public id: number;

  public editor: Editor;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit() {
    console.log('ngOnInit(): discovery detail init');
    this.route.paramMap.subscribe((params => this.id = +params.get('id')));
    // this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number

    this.editor = new Editor({
      el: this.editElementRef.nativeElement,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px'
  });
  }
  back() {
    console.log('backId:', this.id);
    this.router.navigateByUrl('tabs/discovery',  {
      queryParams: { 'backId': this.id },
    });
    // this.location.go('/home');
    // this.router.navigate(['/home', {skipLocationChange: false}]);

  }
  pre() {
    this.router.navigateByUrl(`tabs/discovery/${--this.id}`);
  }
  next() {
    this.router.navigateByUrl(`tabs/discovery/${++this.id}`);
  }

}
