import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import axios from 'axios';
import JsSHA from 'jssha';
export interface Coin {
  currency_code: string,
  balance: string,
  locked: string
}
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

  protected account: Array<Coin> = null;

  protected itemsCollection: Array<Array<Trade>> = null;
  protected items: Array<Trade> = null;
  protected ethItems: Array<Trade> = null;
  protected btcItems: Array<Trade> = null;
  protected usdtItems: Array<Trade> = null;
  protected xcnyItems: Array<Trade> = null;

  constructor(public navCtrl: NavController) {

  }

  public async ngAfterViewInit() {

  }

  protected async getAccount() {
    if (this.key == null || this.key.trim().length === 0 || this.secret == null || this.secret.trim().length === 0) {
      console.log('请输入key secret');
      return;
    }


    let shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(this.secret, 'TEXT');
    let tonce = Math.round(new Date().getTime());
    let str = `GET|/api/v2/accounts|access_key=${this.key}&tonce=${tonce}`;
    shaObj.update(str);
    let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature

    console.log('signature:', signature);
    let url = `https://openapi.ocx.com/api/v2/accounts?access_key=${this.key}&tonce=${tonce}&signature=${signature}`;
    console.log('url:', url);


    try {
      let res = await axios.request({
        // http://www.bylh.top:4000/data
        url: url,
        method: 'get',

        // params: {
        //   market_code: 'ocxeth'
        // },
      });
      console.log(res, res.data);
      this.account = res.data.data;
    } catch (e) {
      console.log('e111:', e);
    }
    return url;
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
  protected coin() {
    if(this.account == null) return;
    return this.account.filter((coin: Coin) => +coin.balance > 0);
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
