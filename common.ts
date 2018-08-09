import JsSHA from 'jssha';
import express from 'express';
import axios from 'axios';
import CircularJSON from 'circular-json';


// 异步工具
export class Defer<T = void> {
   protected _promise: Promise<T>;
   protected _resolve: (value?: T) => void = null;
   protected _reject: (reason: any) => void = null;

   constructor() {
       this._promise = new Promise<T>((resolve, reject) => {
           this._resolve = resolve;
           this._reject = reject;
       })
   }

   public resolve(value?: T): void {
       this._resolve(value);
   }

   public reject(reason: any): void {
       this._reject(reason);
   }

   get promise(): Promise<T> {
       return this._promise;
   }
}

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

export type UrlType = 'accounts' | 'orders';
export function getUrl(key: string, sec: string, type: UrlType): string {
    if (key == null || key.trim().length === 0 || sec == null || sec.trim().length === 0) {
        console.log('请输入key secret');
        return null;
    }
    let shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(sec, 'TEXT');
    let tonce = Math.round(new Date().getTime());
    let str = `GET|/api/v2/${type}|access_key=${key}&tonce=${tonce}`;
    shaObj.update(str);
    let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature
    let url = `https://openapi.ocx.com/api/v2/${type}?access_key=${key}&tonce=${tonce}&signature=${signature}`;

    return url;
}

export async function getSignal(key: string, sec: string, type: UrlType, params: any): Promise<any> {
    let url = getUrl(key, sec, type);
    if (url == null)
        return null;
    try {
        let res = await axios.request({
            url: url,
            method: 'get',

            // params: {
            //   market_code: 'ocxeth'
            // },
        });
        console.log(type,'---------------------------------------------------------------------------------\n', res.data.data);
        return res.data.data;
    } catch (e) {
        console.log('e111:');
        return null;
    }
}


export async function postSignal(key: string, sec: string, type: UrlType, params: any): Promise<any> {
    let url = getUrl(key, sec, type);
    if (url == null)
        throw 'miss params';
    try {
        let res = await axios.request({
            url: url,
            method: 'post',
            params: params
        });
        console.log('价格---------------------------------------------------------------------------------\n', res.data.data);
        return res.data.data;
    } catch (err) {
        console.log('postSignal failed:');
        throw err;
        return null;
    }
}

export async function getTickers(req: express.Request, res: express.Response) {
    try {
        let response = await axios.request({
            url: `https://openapi.ocx.com/api/v2/tickers`,
            method: 'get',
        });
        console.log('getTickers(): 成功');
        res.status(200).json(response.data);
    } catch(err) {
        console.log('getTickers(): 失败', err);
    }
}

export function getGateUrl(key: string, sec: string, type: string): string {
    if (key == null || key.trim().length === 0 || sec == null || sec.trim().length === 0) {
        console.log('请输入key secret');
        return null;
    }
    let shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(sec, 'TEXT');
    let tonce = Math.round(new Date().getTime());
    let str = `GET|/api/v2/${type}|access_key=${key}&tonce=${tonce}`;
    shaObj.update(str);
    let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature
    let url = `https://openapi.ocx.com/api/v2/${type}?access_key=${key}&tonce=${tonce}&signature=${signature}`;

    return url;
}