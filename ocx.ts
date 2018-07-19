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

    webpush.sendNotification({
        endpoint: 'https://fcm.googleapis.com/fcm/send/evtV54I4vGA:APA91bGb9YFg2lruJKAhNumWCJKQ5CIfB3A3sQL85dIaHD7U5OHrWAUVEnNXu6rG2EdD_Nsr39ddLfSoLaDdoHZpFEqHuforW1Cks04T6hgSlOlJPhi7a3AP2Q6ShzEx3ehqzXFDR6uZAo3npshRN1g5MupZIJ9DEw',
        expirationTime: null,
        keys: {
            p256dh: 'BJo6JKqC5e0lGKqJ2xWJkkGV4TwhkCLnwUbsPf4t3_J1SYimaOjtPFCzRDxlIsE798pTT4n-ZAbX-ZRL8TzOZl4',
            auth: 'PmjjDtStp0iV2EMjEFsiwQ'
        }
    }, 'hello', {
            gcmAPIKey: 'AIzaSyBR7RJSH_B51nk0oaxQIY5GGSzLqF6Qork',
            vapidDetails: {
                subject: 'mailto:bylihuan@gmail.com',
                publicKey: 'BIFluEwi4fqj-mItWfNw2JluxgueFRSCYkDhC1cKqBdAqNdHcFHjBgeGl1cjohSGqZUUvUcqL1lXXbXlrHtfkSo',
                privateKey: 'XqOsx4D0H85wlCrQn3IMqZECs9mrGdwk8lMOrAvUFL0',
            },
            // proxy: 'http://97.64.46.130:18443'
            // proxy: 'http://localhost:3000'
        }).then().catch((err: any) => console.log('hello:', err));

    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();