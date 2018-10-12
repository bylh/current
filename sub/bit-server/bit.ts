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
            key: fs.readFileSync('/etc/letsencrypt/live/bylh.top/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/bylh.top/cert.pem', 'utf8')
        };
        console.log(options);
    } catch (err) {
        console.log('读取证书出错', err);
    }


    let app = express();
    let httpsServer, httpServer;
    try {
        httpServer = http.createServer(app);
        httpsServer = https.createServer(options, app);
    } catch (err) {
        console.log('创建https server出错', err);
    }


    app.use(cors()); // 解决跨域访问的问题
    app.use('/data', getData);
    // 启动监听
    httpsServer.listen(5000);
    httpServer.listen(5001);
    if (process.send != null) process.send('ready');

    console.log('https监听5000端口, http监听5001端口');


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

// var express = require('express'); // 项目服务端使用express框架
// var app = express();
// var path = require('path');
// var fs = require('fs');
 
// //使用nodejs自带的http、https模块
// var http = require('http');
// var https = require('https');
 
// //根据项目的路径导入生成的证书文件
// var privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
// var certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
// var credentials = {key: privateKey, cert: certificate};
 
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
 
// //可以分别设置http、https的访问端口号
// var PORT = 8000;
// var SSLPORT = 8001;
 
// //创建http服务器
// httpServer.listen(PORT, function() {
//     console.log('HTTP Server is running on: http://localhost:%s', PORT);
// });
 
// //创建https服务器
// httpsServer.listen(SSLPORT, function() {
//     console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
// });
 
// //可以根据请求判断是http还是https
// app.get('/', function (req, res) {
//     if(req.protocol === 'https') {
//         res.status(200).send('This is https visit!');
//     }
//     else {
//         res.status(200).send('This is http visit!');
//     }
// });
