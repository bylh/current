
const webpush = require('web-push');
import express from 'express';
import { getSignal, postSignal } from './common';
import DBHelper, { WebPushInfo } from './db-helper';
import Config from './config';

const payload = {
    notification: {
        title: "订阅成功",
        body: "之后您将在第一时间收到推送通知!",
        icon: "assets/link_everything_hove.png",
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

export async function subscribe(req: express.Request, res: express.Response) {
    let query = req.query;
    console.log('收到', query.pushSubscription);
    let document = await DBHelper.getOne({pushSubscription: query.pushSubscription});
    if(document != null) {
        console.log('用户已经订阅过了');
        res.status(200).json(req.query);
        return;
    }
    // 说明此设备有新的订阅需求，或者第一次订阅
    await DBHelper.set({
        publicKey: query.publicKey,
        pushSubscription: query.pushSubscription
    } as WebPushInfo);
    sendNotification(query.pushSubscription, payload)
    res.status(200).json(req.query);
}

export function sendNotification(pushSubscription: string, payload: any) {
    webpush.setGCMAPIKey(Config.Push.GcmApiKey);
    webpush.setVapidDetails(Config.Push.Subject, Config.Push.PublicKey, Config.Push.PrivateKey);
    webpush.sendNotification(JSON.parse(pushSubscription), JSON.stringify(payload)).then((suc: any) => console.log('成功', suc)).catch((err: any) => console.log('失败', err));
}
export async function sendNotificationToUsers(req: express.Request, res: express.Response) {
    let subs = await DBHelper.getAll();
    for(let sub of subs) {
        sendNotification(sub.pushSubscription, payload)
    }
    res.status(200).json(payload);
}
export async function autoTrade(req: express.Request, res: express.Response) {
    console.log(req.body, req.query, req.params,req);
    
    if(req.query.key == null || req.query.sec == null){
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
    } catch(err) {
        console.log('下单失败', err);
    }

    let order:any = null;
    let interval = await setInterval(async () => {
        order = await getSignal(req.query.key, req.query.sec, 'orders', null);
        console.log('获取订单成功');
    }, 10000);
    setTimeout(() => {
        console.log('autoTrade:', order)
        res.status(200).json(order)
    }, 12000)
   
}