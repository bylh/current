import JsSHA from 'jssha';
import qs from 'qs';
const webpush = require('web-push');
import axios from 'axios';
import express from 'express';
import { getSignal, postSignal } from './common';
import DBHelper, { WebPushInfo } from './db-helper';
import Config from './config';

const payload = {
    notification: {
        title: "订阅成功",
        body: "之后您将在第一时间收到推送通知!",
        icon: "assets/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [{
            action: "explore",
            title: "Go to the site"
        }]
    }
};

const payloadTest = {
    notification: {
        title: "测试",
        body: "测试推送是否正常!",
        icon: "assets/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [{
            action: "explore",
            title: "Go to the site"
        }]
    }
};

export async function signUp(req: express.Request, res: express.Response) {
    try {
        console.log('开始注册');
        await DBHelper.update(req.query, 'user')
        console.log('注册成功');
        res.sendStatus(200);
    } catch (err) {
        console.log('注册失败');
        res.sendStatus(500);
    }
}

export async function subscribe(req: express.Request, res: express.Response) {
    let query = req.query;
    console.log('收到', query.pushSubscription, query.userId);
    let document = await DBHelper.getOne({ pushSubscription: query.pushSubscription });
    if (document != null) {
        console.log('用户已经订阅过了');
        res.status(200).json(req.query);
        return;
    }
    // 说明此设备有新的订阅需求，或者第一次订阅
    await DBHelper.set({
        userId: query.userId,
        pushSubscription: query.pushSubscription
    } as WebPushInfo);
    sendNotification(query.pushSubscription, payload)
    await DBHelper.set({
        userId: query.userId,

    }, 'user')
    res.status(200).json(req.query);
}

export function sendNotification(pushSubscription: string, payload: any) {
    webpush.setGCMAPIKey(Config.Push.GcmApiKey);
    webpush.setVapidDetails(Config.Push.Subject, Config.Push.PublicKey, Config.Push.PrivateKey);
    webpush.sendNotification(JSON.parse(pushSubscription), JSON.stringify(payload)).then((suc: any) => console.log('成功', suc)).catch((err: any) => console.log('失败', err));
}

export async function sendNotificationToUsers(req: express.Request, res: express.Response) {
    let subs = await DBHelper.getAll({ userId: req.query.userId });
    console.log('所有订阅', subs);
    for (let sub of subs) {
        sendNotification(sub.pushSubscription, payloadTest)
    }
    res.status(200).json(payloadTest);
}
export async function autoTrade(req: express.Request, res: express.Response) {
    console.log(req.body, req.query, req.params, req);

    if (req.query.key == null || req.query.sec == null) {
        res.sendStatus(400);
        return;
    }

    try {
        await postSignal(req.query.key, req.query.sec, 'orders', {
            market_code: req.query.market_code,
            side: req.query.side,
            price: req.query.price,
            volume: req.query.volume,
        })
        console.log('下单成功');
    } catch (err) {
        console.log('下单失败', err);
    }

    let order: any = null;
    let interval = await setInterval(async () => {
        order = await getSignal(req.query.key, req.query.sec, 'orders', null);
        console.log('获取订单成功');
    }, 10000);
    setTimeout(() => {
        console.log('autoTrade:', order)
        res.status(200).json(order)
    }, 12000)
}

/* ------------------------gate-------------------*/
export async function getGateMarketList(req: express.Request, res: express.Response) {
    console.log('getGateMarketList(): start');
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