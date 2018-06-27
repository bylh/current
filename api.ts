import { getSignal, postSignal } from './common';

import express from 'express';

export async function autoTrade(req: express.Request, res: express.Response) {
    console.log(req.body, req.query, req.params, req);
    res.sendStatus(200);
    return;

    if(req.query.key == null || req.query.sec == null || req.query.order == null){
        res.sendStatus(400);
        return;
    } 

    try {
        console.log('111111111111:', req.query.order, typeof(req.query.order));
        await postSignal(req.query.key, req.query.sec, 'orders', req.query.order)
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