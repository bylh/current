import http from 'http';
import express from 'express';
import CircularJSON from 'circular-json';
import axios from 'axios';
import JsSHA from 'jssha';

(async function test(): Promise<void> {

    // 构建server
    let app = express();
    let server = http.createServer(app);

    app.use('/data', getData);
    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');
    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();

async function getData(req: express.Request, res: express.Response) {
    let response = await axios.request({
        url: `https://openapi.ocx.com/api/v2/tickers`,
        method: 'get',
        // params: {
        //     market_code: 'ocxeth'
        // },
        // data: {
        //     action_name: 'QR_LIMIT_STR_SCENE',
        //     action_info: {
        //         scene: {
        //             scene_str: param
        //         }
        //     }
        // }
    });
    // console.log('res:', response.data);

    // Demo: Circular reference

    res.status(200).json(response.data);
    // res.sendStatus(200);
    // CircularJSON.stringify(response)
    // res.status(200).send(JSON.parse(CircularJSON.stringify(response)));
    // res.status(200).send(eval(CircularJSON.stringify(response)))
}