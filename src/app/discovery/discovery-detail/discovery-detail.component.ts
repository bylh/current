import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-discovery-detail',
  templateUrl: './discovery-detail.component.html',
  styleUrls: ['./discovery-detail.component.scss']
})
export class DiscoveryDetailComponent implements OnInit {

  public id: number;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params => this.id = +params.get('id')));
    this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
  }
  back() {
    console.log('backId:', this.id);
    this.router.navigate(['/discovery', {backId: this.id}]);
  }
  pre() {
    this.router.navigate([`/discovery/${--this.id}`]);
  }
  next() {
    this.router.navigate([`/discovery/${++this.id}`]);
  }

}
