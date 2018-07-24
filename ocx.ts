// import webpush from 'web-push';
const webpush = require('web-push');
import { UrlType, getUrl, getSignal, getTickers } from './common';
import http from 'http';
import express from 'express';
import cors from 'cors';
import program from 'commander';
import { autoTrade } from './api';

(async function main(): Promise<void> {
    program.version('1.0.0')
        // .option('-k, --key <key>', '[required] The key of account')
        // .option('-s, --sec <sec>', '[required] The secret of account')
        .option('-k, --key <key>', 'The key of account')
        .option('-s, --sec <sec>', 'The secret of account')
        .parse(process.argv);

    let key = program.key as string,
        sec = program.sec as string;

    if (key == null || sec == null) { // 未指定则提示
        program.outputHelp();
        // return;
    }

    // 构建server
    let app = express();
    let server = http.createServer(app);
    app.use(cors()); // 解决跨域访问的问题
    app.use('/get-tickers', getTickers);
    // app.use('/auto-trade', autoTrade);
    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');
    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();