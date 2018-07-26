
const webpush = require('web-push');
import express from 'express';
import { getSignal, postSignal } from './common';
import DBHelper, { WebPushInfo } from './db-helper';

export async function subscribe(req: express.Request, res: express.Response) {
    // console.log(req.body, req.query, req.params,req);
    let query = req.query;
    console.log('收到', query.pushSubscription);
    let document = await DBHelper.get();
    webpush.setGCMAPIKey(document.gcmApikey);
    webpush.setVapidDetails(document.subject, document.publicKey, document.privateKey);
    const payload = {
        notification: {
            title: "订阅成功通知",
            body: "之后可以收到我的消息了!",
            icon: "assets/main-page-logo-small-hat.png",
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
    console.log('得到的订阅',query);
    webpush.sendNotification(JSON.parse(query.pushSubscription), JSON.stringify(payload)).then((suc: any) => console.log('成功', suc)).catch((err: any) => console.log('失败', err));
    res.status(200).json(req.query);
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