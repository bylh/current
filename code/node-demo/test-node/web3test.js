// var Web3 = require("web3");
// // 创建web3对象
// var web3 = new Web3();
// // 连接到以太坊节点
// web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
// console.log(web3.providers)

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/YORUTOKEN"));
// var Tx = require('ethereumjs-testrpc');
web3.eth.getBlockNumber(console.log)