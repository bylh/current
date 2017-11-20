var myWorker = new Worker('worker.js');
myWorker.postMessage('123');
myWorker.onmessage = function(e) {
    console.log(e);
}