// // let introJs = require("intro.js");
// // import introJs from "intro.js/intro.js"
// // var myWorker = new Worker('worker.js');


// let source = `onmessage = function(e) {
//     console.log('Message received from main script');
//     var workerResult = 'Result';
//     console.log('Posting message back to main script');
//     postMessage(workerResult);
//   }`;
// let myWorker = new Worker(URL.createObjectURL(
//     new Blob([source], {type: 'application/javascript'})
// ));
// myWorker.onmessage = function(e) {
//     console.log('shoudao',e);
// }
// myWorker.postMessage('123');

// introJs().setOptions({
//     steps: [{
//         element: document.getElementById(1),  
//         intro: '111',
//         // position:'bottom-right-aligned',
//         tooltipPosition:'bottom-right-aligned'      
//     },
// {
//     element: document.getElementById(2),  
//     intro: '222',    
// }],
// }
// );

// (document.getElementById(1)).onclick();


// function test() {
//     console.log('hello')
// }
// // introJs().showHints();

// // introJs().setOptions(
// //     {
// //       hints:[
// //       {
// //         element: '#one',
// //         hintPosition: 'bottom',
// //         hint: 'hello one!'
// //       },
// //       {
// //         element: '#two',
// //         hintPosition: 'right',
// //         hint: 'hello two!'
// //       }
// //       ]
// //     }
// //     ).addHints().start();
// function showToastr() {
//     console.log('showToastr 11111');
//     toastr.info('This is a info toastr');
// }
wx.ready(function() {
    console.log(window.__wxjs_environment === 'miniprogram') // true
})
console.log(wx, wx.miniProgram);
console.log(window.__wxjs_environment === 'miniprogram');
wx.miniProgram.navigateTo({url: '../logs/logs'});
console.log('跳转');
// wx.miniProgram.postMessage({ data: 'foo' });
// wx.miniProgram.postMessage({ data: {foo: 'bar'} });
// wx.miniProgram.getEnv(function(res) { console.log(res.miniprogram); // true })
// wx.miniProgram.navigateTo({url: '/path/to/page'});