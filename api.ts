import { getSignal } from './common';

import express from 'express';

export async function autoTrade(req: express.Request, res: express.Response) {
 
    console.log(req.query);
    res.sendStatus(400);
    return;
    if(req.body.key == null || req.body.sec == null){
        res.sendStatus(400);
        return;
    } 
    let interval = setInterval(async () => {
        let order = await getSignal(req.body.key, req.body.sec, 'orders', null);
        console.log('获取订单成功');
        res.status(200).json(order)
    }, 10000);
}