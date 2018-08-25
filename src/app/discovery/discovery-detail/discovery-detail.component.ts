import { Component, OnInit } from '@angular/core';
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
    this.route.paramMap.subscribe((params => this.id = +params.get('id')));
    // this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
  }
  back() {
    console.log('backId:', this.id);
    this.router.navigate(['tabs/discovery', { backId: this.id }]);
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
