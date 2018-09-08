
// import webpush from 'web-push';
import multer from 'multer';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import cors from 'cors';
import program from 'commander';
import { subscribe, sendNotificationToUsers, signUp, login, checkSession, resetPwd, uploadImg, getProfile, updateProfile } from './src/api/auth';
import DBHelper, { CollectUri } from './src/common/db-helper';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { getGateMarketList } from './src/api/data';
import { getGateBalances, getGateCoinAdress, startGateAutoTrade } from './src/api/data';
const MongoStore = connectMongo(session);


const storage = multer.diskStorage({
    //destination 用来设置上传文件的路径 可以接收一个回调函数， 或者一个字符串
    //如果传递一个回调函数的话，则需要确保路径有效
    destination: 'public/imgs/',

    //filename 属性可以用来指定文件上传以后保存到服务器中的名字
    filename: (req, file, cb) => {
        //cb(null, file.fieldname + '-' + Date.now())
        //获取文件的扩展名
        //Chrysanthemum.jpg
        let fname = file.originalname;
        let extName = "";
        //判断文件是否具有扩展名
        if (fname.lastIndexOf(".") != -1) {
            extName = fname.slice(fname.lastIndexOf("."));
        }

        //上传文件时，一般不会直接将用户的文件名直接保存的服务器中
        //一般会随机生成一个文件名
        // cb(null, file.fieldname + '-' + Date.now() + extName);
        cb(null, req.session.userId + '-' + 'bg' + extName);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        //限制文件的大小为1M
        fileSize: 1024 * 1024
    }
});

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
            maxAge: 1000 * 3600 * 24    /*过期时间 1天*/

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

    app.use('/sign-up', signUp);
    app.use('/login', login);

    app.use("/logout", (req, res, next) => {
        console.log('登出', req.session.userId);
        req.session.destroy((err) => {  //通过destroy()函数销毁session
            console.log('错误', err);
        });
        res.clearCookie('connect.sid')
        res.sendStatus(200);
    });
    app.use('/reset-pwd', checkSession, resetPwd);

    app.use('/get-profile', getProfile);
    app.use('/update-profile', updateProfile);

    app.use('/upload-img', upload.single('file'), uploadImg);


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