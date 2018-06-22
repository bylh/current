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
    // xNBTeVygbSlF6g6TAr8tSXbTdfh91fthNmAlMriB
    // 备注名 coinx-web
    // 4a7cLSrZqdgrVxbL37w1FyxAfxX2wK2bx01tY8Qy
    // 创建时间 2018-06-13 05:39:19
    let shaObj = new JsSHA('SHA-1', 'TEXT');
    // shaObj.update('jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + request.url);
    let signature = shaObj.getHash('HEX'); // 对str使用sha1签名，得到signature
    // let hash = HMAC-SHA256(payload, secret_key).to_hex 

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
    console.log('res:', response.data);

    // Demo: Circular reference

    res.status(200).json(response.data);
    // CircularJSON.stringify(response)
    // res.status(200).send(JSON.parse(CircularJSON.stringify(response)));
    // res.status(200).send(eval(CircularJSON.stringify(response)))
}