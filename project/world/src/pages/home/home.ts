import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import axios from 'axios';
export interface Trade {
  market_code: string,
  buy: string,
  sell: string,
  open: string,
  high: string,
  low: string,
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  protected key: string = null;
  protected secret: string = null;

  protected itemsCollection: Array<Array<Trade>> = null;
  protected items: Array<Trade> = null;
  protected ethItems: Array<Trade> = null;
  protected btcItems: Array<Trade> = null;
  protected usdtItems: Array<Trade> = null;
  protected xcnyItems: Array<Trade> = null;

  constructor(public navCtrl: NavController) {

  }

  public ngAfterViewInit() {

  }

  protected async getPrice() {
    console.log('getPrice111');
    let res = await axios.request({
      // http://www.bylh.top:4000/data
      url: `https://openapi.ocx.com/api/v2/tickers`,
      method: 'get',

      // params: {
      //   market_code: 'ocxeth'
      // },
    });
    console.log(res.data);
    this.items = res.data.data;
    this.ethItems = this.items.filter((item) => item.market_code.endsWith('eth'));
    this.btcItems = this.items.filter((item) => item.market_code.endsWith('btc'));
    this.usdtItems = this.items.filter((item) => item.market_code.endsWith('usdt'));
    this.xcnyItems = this.items.filter((item) => item.market_code.endsWith('xcny'));
    this.itemsCollection = [this.ethItems, this.btcItems, this.usdtItems, this.xcnyItems];
    console.log(this.items, this.ethItems, this.btcItems, this.usdtItems, this.xcnyItems);
  }
  protected sort(): Array<Trade> {
    if (this.items == null) return;

    let items = this.items.sort((a: Trade, b: Trade) => {
      if (a.market_code[a.market_code.length - 1] > b.market_code[b.market_code.length - 1])
        return 1;
      else
        return -1;
    })
    let a = [1, 2, 3];
    a.sort((a: number, b: number) => a - b)
    return items;
  }
}
