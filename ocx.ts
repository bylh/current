
import http from 'http';
import express from 'express';
import cors from 'cors';
import CircularJSON from 'circular-json';
import axios from 'axios';
import JsSHA from 'jssha';
import program from 'commander';

export type UrlType = 'accounts' | 'orders'

(async function main(): Promise<void> {
    program.version('1.0.0')
        .option('-k, --key <key>', '[required] The key of account')
        .option('-s, --sec <sec>', '[required] The secret of account')
        .parse(process.argv);

    let key = program.key as string,
        sec = program.sec as string;

    if (key == null || sec == null) { // 未指定则退出
        program.outputHelp();
        return;
    }

    console.log(key, sec);
    // 构建server
    let app = express();
    let server = http.createServer(app);
    app.use(cors()); // 解决跨域访问的问题
    app.use('/data', getData);
    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');

    let interval = setInterval(async () => {
        await getAll(key, sec, 'orders', null);
    }, 10000);


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

async function getAll(key: string, sec: string, type: UrlType, params: any): Promise<any> {
    let url = getUrl(key, sec, type);
    if (url == null)
        return null;
    try {
        let res = await axios.request({
            // http://www.bylh.top:4000/data
            url: url,
            method: 'get',

            // params: {
            //   market_code: 'ocxeth'
            // },
        });
        console.log(type,'---------------------------------------------------------------------------------\n', res.data.data);
        return res.data.data;
    } catch (e) {
        console.log('e111:');
    }
}


async function postAll(key: string, sec: string, type: UrlType, params: any): Promise<any> {
    let url = getUrl(key, sec, 'accounts');
    if (url == null)
        return null;
    try {
        let res = await axios.request({
            // http://www.bylh.top:4000/data
            url: url,
            method: 'post',

            // params: {
            //   market_code: 'ocxeth'
            // },
        });
        console.log('价格---------------------------------------------------------------------------------\n', res.data.data);
        return res.data.data;
    } catch (e) {
        console.log('e111:');
    }
}

function getUrl(key: string, sec: string, type: UrlType): string {
    if (key == null || key.trim().length === 0 || sec == null || sec.trim().length === 0) {
        console.log('请输入key secret');
        return null;
    }
    let shaObj = new JsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(sec, 'TEXT');
    let tonce = Math.round(new Date().getTime());
    let str = `GET|/api/v2/${type}|access_key=${key}&tonce=${tonce}`;
    shaObj.update(str);
    let signature = shaObj.getHMAC('HEX'); // 对str使用sha1签名，得到signature
    let url = `https://openapi.ocx.com/api/v2/${type}?access_key=${key}&tonce=${tonce}&signature=${signature}`;

    return url;
}