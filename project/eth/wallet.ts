import http from 'http';
import express from 'express';
import * as vanity from 'vanity-eth';
import Web3 from 'web3';

(async function startup(): Promise<void> {
     // 构建server
     let app = express();
     let server = http.createServer(app);
     console.log('hello');
    // await generate();
    // console.log(Web3);
    // if (typeof Web3 !== 'undefined') {
    //     web3 = new Web3(web3.currentProvider);
    //   } else {
    //     // set the provider you want from Web3.providers
    //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //   }
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    // let temp = web3.eth.accounts.create();
        // let my = await web3.eth.accounts.wallet.lo()
    // console.log('create account:', temp);

    // let wallets = web3.eth.accounts.wallet.create(2, 'bylh');
    // console.log(wallets);
    // let account = await web3.eth.personal.newAccount('123456');
    // console.log(account);
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // try {
    //     let tempAccounts = await web3.eth.getAccounts();
    //     console.log(tempAccounts, tempAccounts.length);
    //     // await web3.eth.getBalance(temp.address);
    //     // await web3.eth.accounts.wallet.remove(temp)

    // }catch(err) {
    //     console.log('err:', err);
    // }
    // web3.eth.getBalance('')

    // 启动监听
    app.listen(4000);
    if (process.send != null) process.send('ready');

    console.log('监听4000端口');
    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();
