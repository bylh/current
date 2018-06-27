import axios from 'axios';
import http from 'http';
import express from 'express';
import cors from 'cors';
(async function main() {
    let app = express();
    let server = http.createServer(app);
    app.use(cors()); // 解决跨域访问的问题
    app.use('/data', getData);
    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');

    let res = await axios.request({
        // http://www.bylh.top:4000/data
        url: `http://www.bylh.top:4000/data`,
        method: 'get',

        // params: {
        //   market_code: 'ocxeth'
        // },
    });
    console.log(res.data);

    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();

async function getData(req: express.Request, res: express.Response) {
    let response = await axios.request({
        url: `https://openapi.ocx.com/api/v2/tickers`,
        method: 'get',
    });
    res.status(200).json(response.data);
    // res.sendStatus(200);
    // CircularJSON.stringify(response)
    // res.status(200).send(JSON.parse(CircularJSON.stringify(response)));
    // res.status(200).send(eval(CircularJSON.stringify(response)))
}