import JsSHA from 'jssha';
import qs from 'qs';
import axios from 'axios';
import express from 'express';


/* ------------------------gate-------------------*/
export async function getGateMarketList(req: express.Request, res: express.Response) {
    console.log('getGateMarketList(): start');
    console.log('getTickers:', req.session);
    try {
        let result = await axios.request({
            url: 'https://data.gateio.io/api2/1/marketlist',
            method: 'get'
        });
        res.status(200).json(result.data.data);
        console.log('getGateMarketList(): finish');
    } catch (err) {
        console.log('getGateMarketList(): get err', err);
        res.sendStatus(500);
    }
}

export function getSign(base: string, content: string, type: 'SHA-1' | 'SHA-224' | 'SHA-256' | 'SHA-384' | 'SHA-512') {
    let shaObj = new JsSHA(type, 'TEXT');
    console.log('base', base);
    shaObj.setHMACKey(base, 'TEXT');
    shaObj.update(content);
    let signature = shaObj.getHMAC('HEX');
    return signature;
}

export async function getGateBalances(req: express.Request, res: express.Response) {
    console.log('getGateBalances(): start', req.query);

    try {
        let signature = getSign(req.query.gateSecret, '', 'SHA-512');
        console.log('sign:', signature);
        let header: any = {};
        header.KEY = req.query.gateKey,
            header.SIGN = signature;
        let result = await axios.request({
            url: 'https://api.gateio.io/api2/1/private/balances',
            method: 'post',
            headers: header,
        });
        res.status(200).json(result.data);
        console.log('getGateBalances(): finish', result);
    } catch (err) {
        console.log('getGateBalances(): get err', err);
        res.sendStatus(500);
    }
}

export async function getGateCoinAdress(req: express.Request, res: express.Response) {
    console.log('getGateCoinAdress(): start', req.query);
    let form = { currency: req.query.currency };
    try {
        let signature = getSign(req.query.gateSecret, qs.stringify(form), 'SHA-512');
        console.log('sign:', signature);
        let header: any = {};
        header.KEY = req.query.gateKey,
            header.SIGN = signature;
        let result = await axios.request({
            url: 'https://api.gateio.io/api2/1/private/depositAddress',
            method: 'post',
            headers: header,
            data: qs.stringify(form)
        });
        res.status(200).json(result.data);
        console.log('getGateCoinAdress(): finish', result);
    } catch (err) {
        console.log('getGateCoinAdress(): get err', err);
        res.sendStatus(500);
    }
}

export async function startGateAutoTrade(req: express.Request, res: express.Response) {
    console.log('startGateAutoTrade(): start');
    try {
        let shaObj = new JsSHA('SHA-512', 'TEXT');
        shaObj.setHMACKey('', 'TEXT');
        let str = '';
        shaObj.update(str);
        let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature
        let header: any = {};
        header.KEY = '',
            header.SIGN = signature;
        let result = await axios.request({
            url: 'https://api.gateio.io/api2/1/private/balances',
            method: 'post',
            headers: header,
        });
        res.status(200).json(result.data);
        console.log('startGateAutoTrade(): finish', result);
    } catch (err) {
        console.log('startGateAutoTrade(): get err', err);
        res.sendStatus(500);
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

