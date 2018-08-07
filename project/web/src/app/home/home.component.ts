import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  async getPairs() {
    try {
      const res = await axios.request({
        url: 'http://localhost:4200/data/api2/1/pairs',
        method: 'get',
      });
      console.log('res:', res);
    } catch (err) {
      console.log('err:', err);
    }
  }

}
