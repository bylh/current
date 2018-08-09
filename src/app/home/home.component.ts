import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
export interface Coin {
  symbol: string; // 代币简称 如ETH
  pair: string; // 交易对
  rate: string; // 兑换率
  rate_percent: string; // 上涨下降比
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gateKey: string;
  gateSecret: string;
  coinName: string;
  address: string;
  displayedColumns: string[] = ['symbol', 'pair', 'rate', 'rate_percent'];
  coins: Array<Coin> = null;
  balances: any;
  constructor() { }

  ngOnInit() {
  }
  async getMarkerList() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-marketlist`,
        method: 'get',
      });
      console.log('res:', res);
      this.coins = res.data.map(coin => {
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

  async getGateBalances() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-balances`,
        method: 'post',
        params: {
          gateKey: this.gateKey,
          gateSecret: this.gateSecret
        }
      });
      console.log('res:', res, res.data);
      this.balances = Object.entries(res.data.available).map((item => {
        return {coinName: item[0], count: item[1]};
      }));
      console.log('balances:', this.balances);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateCoinAdress() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-coinadress`,
        method: 'post',
        params: {
          gateKey: this.gateKey,
          gateSecret: this.gateSecret,
          currency: this.coinName
        }
      });
      console.log('res:', res);
      this.address = res.data.addr;
    } catch (err) {
      console.log('err:', err);
    }
  }

}
