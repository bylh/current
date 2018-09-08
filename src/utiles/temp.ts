var GateIo = require('gate.io');
var gateIoClient = new GateIo('3E32736D-29B0-49F6-8954-F91752C659FB', 'a15a4a100a510542c82e3d4ef48ceddbcdd33319d0a2db47ed967d84973ccc99');

gateIoClient.getBalances(res => console.log(res));