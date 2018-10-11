import axios from 'axios';
import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';

(async function main() {
    let options;
    try {
        options = {
            key: fs.readFileSync('/home/bylh/test/fullchain.pem', 'utf8'),
            cert: fs.readFileSync('/home/bylh/test/privkey.pem', 'utf8')
        };
        console.log(options);
    } catch(err) {
        console.log('读取证书出错', err);
    }
   

    let app = express();

    let server = https.createServer(options, app);

    app.use(cors()); // 解决跨域访问的问题
    app.use('/data', getData);
    // 启动监听
    server.listen(5000);
    if (process.send != null) process.send('ready');

    console.log('监听5000端口');


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
}