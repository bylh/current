import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import axios, { AxiosInstance } from 'axios';
import JsSHA from 'jssha';
import qs from 'qs';
export interface Coin {
  currency_code: string,
  balance: string,
  locked: string
}
export interface Ticker {
  market_code: string,
  buy: string,
  sell: string,
  open: string,
  high: string,
  low: string,
}
export interface Order {
  id: number	// 委托订单 ID
  side: string	// Buy/Sell, 代表买单/卖单.
  ord_type: string	// limit: 限价单；
  price: number	// 价格
  avg_price: number	// 平均价格
  state: string	// 委托订单状态: wait、done、cancel
  state_i18n: string	// 委托订单状态(国际化)
  market_code: string	// 交易对
  market_name: string	// 订单参与的交易市场
  market_base_unit: string //	市场基准货币
  market_quote_unit: string //	市场报价货币
  created_at: string	// 下单时间, ISO8601格式
  volume: number	// 交易数量（买入、卖出）volume = remaining_volume + executed_volume
  remaining_volume: number // decimal	未成交的数量
  executed_volume: number // decimal	已成交的数量
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  protected key: string = null;
  protected secret: string = null;

  protected account: Array<Coin> = null;
  protected orders: Array<Order> = null;

  protected itemsCollection: Array<Array<Ticker>> = null;
  protected items: Array<Ticker> = null;
  protected ethItems: Array<Ticker> = null;
  protected btcItems: Array<Ticker> = null;
  protected usdtItems: Array<Ticker> = null;
  protected xcnyItems: Array<Ticker> = null;

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
      url: `http://www.bylh.top:4000/data`,
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
  protected async getOrders() {
    if (this.key == null || this.key.trim().length === 0 || this.secret == null || this.secret.trim().length === 0) {
      console.log('请输入key secret');
      return;
    }


    let shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(this.secret, 'TEXT');
    let tonce = Math.round(new Date().getTime());
    let str = `GET|/api/v2/orders|access_key=${this.key}&tonce=${tonce}`;
    shaObj.update(str);
    let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature

    console.log('signature:', signature);
    let url = `https://openapi.ocx.com/api/v2/orders?access_key=${this.key}&tonce=${tonce}&signature=${signature}`;
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
      this.orders = res.data.data;
    } catch (e) {
      console.log('e111:', e);
    }
    return url;
  }
  protected coin() {
    if (this.account == null) return;
    return this.account.filter((coin: Coin) => +coin.balance > 0);
  }
  protected sort(): Array<Ticker> {
    if (this.items == null) return;

    this.items.sort((a: Ticker, b: Ticker) => {
      if (a.market_code[a.market_code.length - 1] > b.market_code[b.market_code.length - 1])
        return 1;
      else
        return -1;
    })
    return this.items;
  }

  protected async startAutoTrade() {
    // let queryDefault: AxiosInstance = axios.create({
    //   baseURL: 'http://localhost:4000',
    //   method: 'post', // 注意：此处设定method的默认值，每个请求无需自行设定
    //   data: { _version: 1 }, // 注意：此处以下划线开头，确保不会和其他数据产生冲突
    //   timeout: 1000
    // });
    // let x = await queryDefault.request({
    //   url: '/auto-trade',
    //   // method: 'post',
    //   data: {
    //     key: '123', sec: '456'
    //   }
    // });
    try {
      let shaObj = new JsSHA('SHA-256', 'TEXT');
      shaObj.setHMACKey(this.secret, 'TEXT');
      let tonce = Math.round(new Date().getTime());
      let str = `POST|/api/v2/orders|access_key=${this.key}&market_code=ocxusdt&price=0.03&side=buy&tonce=${tonce}&volume=200`;
      shaObj.update(str);
      let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature
  
      console.log('signature:', signature);
      // https://openapi.ocx.com/api/v2/orders/286323457/cancel?access_key=${this.key}&tonce=${tonce}&signature=${signature}
      // https://openapi.ocx.com/api/v2/orders' -d 'access_key=your_access_key&tonce=1234567&signature=computed_signature&market_code=btccny&price=40000&side=buy&volume=1
      let url = `https://openapi.ocx.com/api/v2/orders?access_key=${this.key}&tonce=${tonce}&signature=${signature}`;

      // console.log(`curl -X GET 'https://openapi.ocx.com/api/v2/orders?access_key=${this.key}&tonce=${tonce}&signature=${signature}'`)
      console.log(`curl -X POST 'https://openapi.ocx.com/api/v2/orders' -d 'access_key=${this.key}&tonce=${tonce}&signature=${signature}&market_code=ocxusdt&price=0.03&side=buy&volume=200'`)
      let res = await axios.request({
        url: 'http://localhost:4000/auto-trade',
        method: 'post',
        params:{
          market_code: 'ocxusdt',
          side: 'buy',
          price: '0.03',
          volume: '200',
        },
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // }
        // headers: { 'Content-type': 'application/json' }
      })
      console.log(res.data, '成功');
    } catch(err) {
      console.log(err.code, '失败了')
    }
    // try {
    //   let res = await axios.post('http://localhost:4000/auto-trade',{

    //     data: qs.stringify({
    //       'key': this.key,
    //       'sec': this.secret,
    //       // order: {
    //       //   market_code: 'ocxxcny',
    //       //   side: 'buy',
    //       //   price: 0.30,
    //       //   volume: 20,
    //       // }
    //     })
    //     // data: {
    //     //   key: this.key,
    //     //   sec: this.secret,
    //     //   order: {
    //     //     market_code: 'ocxxcny',
    //     //     side: 'buy',
    //     //     price: 0.30,
    //     //     volume: 20,
    //     //   }
    //     // },
    //   });
    //   console.log(res, res.data);
    //   // this.orders = res.data;
    // } catch (e) {
    //   console.log('e111:', e);
    // }
  }

}
