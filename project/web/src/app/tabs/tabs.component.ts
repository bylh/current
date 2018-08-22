import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  public goTab(name: string){
    this.router.navigateByUrl(name);
  }

}
