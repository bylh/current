
// import webpush from 'web-push';

import bodyParser from 'body-parser';
import { UrlType, getUrl, getSignal, getTickers } from './common';
import http from 'http';
import express from 'express';
import cors from 'cors';
import program from 'commander';
import { autoTrade, subscribe, sendNotification, sendNotificationToUsers, getGateMarketList, startGateAutoTrade, getGateBalances, getGateCoinAdress, signUp, login, checkSession, resetPwd, uploadImg } from './api';
import DBHelper, { CollectUri } from './db-helper';
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

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
    } catch (err) {
        console.log('main(): 连接数据库失败', err);
    }

    // 构建server
    let app = express();
    let server = http.createServer(app);
    app.enable('trust proxy'); // 支持反向代理
    app.use(bodyParser.json({ limit: 1 * 1024 * 1024 })); // 最大1M的JSON请求
    app.use(cors({
        origin: new RegExp('[a-zA-z]+://[^\s]*'),
        // origin: ['http://localhost:4200', 'http://localhost:3000', 'https://bylh.top'],
        credentials: true // 设置允许跨域访问默认是拒绝接收浏览器发送的cookie，这里设置允许
    })); // 解决跨域访问的问题


    //配置中间件
    app.use(session({
        secret: 'this is a string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
        // name: 'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
        resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
        saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
        cookie: {
            httpOnly: false, // 决定了用户是否有读写此cookie的权限
            // expires: // 过期的日期
            maxAge: 1000*3600*24    /*过期时间 1天*/

        },   
        
        /* secure:true  https这样的情况才可以访问cookie */
        // rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
        store: new MongoStore({
            url: CollectUri,  //数据库的地址
            touchAfter: 24 * 3600   // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
        })
    }));

    app.use(express.static('public')); // 静态资源库


    app.use("/check-session", (req, res, next) => {
        console.log(req.session);
        if (req.session.userId) {  //获取session
            // res.send('你好' + req.session.userId + '欢迎回来');
            res.status(200).json({
                userId: req.session.userId
            });
        } else {
            res.send('未登录');
        }
    });


    app.use('/get-tickers', getTickers);
    // app.use('/auto-trade', autoTrade);

    app.use('/sign-up', signUp);
    app.use('/login', login);

    app.use("/logout",  (req, res, next) => {
        console.log('登出', req.session.userId);
        // req.session.cookie = null;
        // req.session.cookie.maxAge=0;  //重新设置过期时间来销毁。cookie中保存有sessionID
        req.session.destroy(function (err) {  //通过destroy()函数销毁session
            console.log('错误', err);
        });
        res.clearCookie('connect.sid')
        res.sendStatus(200);
    });
    app.use('/reset-pwd', resetPwd);

    app.use('/upload-img', uploadImg);


    app.use('/subscribe', subscribe); // 用户订阅
    app.use('/send-all', sendNotificationToUsers); // 若未指定用户则给所有用户发消息, 否则给单个用户发消息

    app.use('/get-gate-marketlist', checkSession, getGateMarketList);
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