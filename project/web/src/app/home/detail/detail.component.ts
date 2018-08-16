import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public id: number;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log('detail');
    this.route.paramMap.subscribe((params => this.id = +params.get('id')));
    this.id = +this.route.snapshot.paramMap.get('id'); // + 将string转化为number
  }

}
