// import webpush from 'web-push';
import bodyParser from 'body-parser';
import { UrlType, getUrl, getSignal, getTickers } from './common';
import http from 'http';
import express from 'express';
import cors from 'cors';
import program from 'commander';
import { autoTrade, subscribe, sendNotification, sendNotificationToUsers, getGateMarketList, startGateAutoTrade, getGateBalances, getGateCoinAdress, signUp} from './api';
import DBHelper from './db-helper';

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
    try {
        await DBHelper.init();
        console.log('main(): 连接数据库成功');
    } catch(err) {
        console.log('main(): 连接数据库失败', err);
    }
 
    // 构建server
    let app = express();
    let server = http.createServer(app);
    app.enable('trust proxy'); // 支持反向代理
    app.use(bodyParser.json({limit: 1 * 1024 * 1024})); // 最大1M的JSON请求
    app.use(cors()); // 解决跨域访问的问题

    app.use(express.static('public')); // 静态资源库

    app.use('/get-tickers', getTickers);
    // app.use('/auto-trade', autoTrade);
    app.use('/sign-up', signUp);
    app.use('/subscribe', subscribe); // 用户订阅
    app.use('/send-all', sendNotificationToUsers); // 若未指定用户则给所有用户发消息, 否则给单个用户发消息

    app.use('/get-gate-marketlist', getGateMarketList);
    app.use('/get-gate-balances', getGateBalances);
    app.use('/get-gate-coinAdress', getGateCoinAdress);
    app.use('/start-gate-autotrade', startGateAutoTrade);
    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');
    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();  