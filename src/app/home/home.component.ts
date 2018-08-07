import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
export interface Coin {
  symbol: string;
  pair: string;
  rate: string;
  rate_percent: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'pair', 'rate', 'rate_percent'];
  coins: Array<Coin> = null;
  constructor() { }

  ngOnInit() {
  }
  async getMarkerList() {
    try {
      const res = await axios.request({
        url: `${environment.BaseClientUrl}/data/api2/1/marketlist`,
        method: 'get',
      });
      console.log('res:', res.data);
      this.coins = res.data.data.map(coin => {
        return {
          symbol: coin.symbol,
          pair: coin.pair,
          rate: coin.rate,
          rate_percent: coin.rate_percent
        };
      });
    } catch (err) {
      console.log('err:', err);
    }
  }

}
