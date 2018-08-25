import { ToolsService } from './tools.service';
import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';
export interface Coin {
  symbol: string; // 代币简称 如ETH
  pair: string; // 交易对
  rate: string; // 兑换率
  rate_percent: string; // 上涨下降比
}

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  gateKey: string;
  gateSecret: string;
  coinName: string;
  address: string;
  displayedColumns: string[] = ['symbol', 'pair', 'rate', 'rate_percent'];
  coins: Array<Coin> = null;
  balances: any;
  constructor(public toolsService: ToolsService, public snackBar: MatSnackBar) {
  }

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
        return { coinName: item[0], count: item[1] };
      }));
      console.log('balances:', this.balances);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateCoinAdress() {
    if (this.coinName == null) {
      this.snackBar.open('请输入代币名称');
      return;
    }
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
