// let introJs = require("intro.js");
// import introJs from "intro.js/intro.js"
// var myWorker = new Worker('worker.js');
let source = `onmessage = function(e) {
    console.log('Message received from main script');
    var workerResult = 'Result';
    console.log('Posting message back to main script');
    postMessage(workerResult);
  }`;
let myWorker = new Worker(URL.createObjectURL(
    new Blob([source], {type: 'application/javascript'})
));
myWorker.onmessage = function(e) {
    console.log('shoudao',e);
}
myWorker.postMessage('123');

console.log('hello');
introJs().start();
introJs().showHints();

// introJs().setOptions(
//     {
//       hints:[
//       {
//         element: '#one',
//         hintPosition: 'bottom',
//         hint: 'hello one!'
//       },
//       {
//         element: '#two',
//         hintPosition: 'right',
//         hint: 'hello two!'
//       }
//       ]
//     }
//     ).addHints().start();
function showToastr() {
    console.log('showToastr 11111');
    toastr.info('This is a info toastr');
}
