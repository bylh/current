import { getSignal, postSignal } from './common';

import express from 'express';

export async function subscribe(req: express.Request, res: express.Response) {
    // console.log(req.body, req.query, req.params,req);
    console.log('收到', req.query.endpoint, '\n', req.query.auth, '\n', req.query.p256dh);
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