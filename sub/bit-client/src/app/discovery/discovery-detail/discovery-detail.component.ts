import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discovery-detail',
  templateUrl: './discovery-detail.component.html',
  styleUrls: ['./discovery-detail.component.scss']
})
export class DiscoveryDetailComponent implements OnInit {

  public id: number;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit() {
    console.log('ngOnInit(): discovery detail init');
    this.route.paramMap.subscribe((params => {this.id = +params.get('id'); console.log('id:', this.id)}));
    // this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
    this.route.queryParamMap.subscribe((params => {
      console.log(params.get('id'));
    }));
  }
  back() {
    console.log('backId:', this.id);
    this.router.navigate(['tabs/discovery'], {
      queryParams: { 'backId': this.id },
    });
    // this.location.go('/home');
    // this.router.navigate(['/home', {skipLocationChange: false}]);

  }
  pre() {
    this.router.navigate([`tabs/discovery/${--this.id}`]);
  }
  next() {
    this.router.navigate([`tabs/discovery/${++this.id}`]);
  }

}
