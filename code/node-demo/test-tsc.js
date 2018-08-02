const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const Crawler = require('crawler');
const fs = require('fs');
var uris = [];
var answerUris = [];

for (let i = 0; i < 100; i++) {
    uris.push(`https://tiku.21cnjy.com/tiku.php?mod=quest&channel=10&xd=2&type=1&page=${i + 1}`)
}
var a = new Crawler({
    jQuery: jsdom,
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const dom = new JSDOM(res.body);
            const document = dom.window.document;
            let element = document.getElementsByClassName('answer_detail')[0];
            let content = element.querySelector('dl > dt > p').textContent + '\r\n';
            for(let item of element.querySelectorAll('dl dt td')) {
                content += item.firstChild.textContent  + '\r\n';
            }
            let answerElement = element.querySelectorAll('dl > dd > p > i');

            content += '答案：' + answerElement[0].textContent + '\r\n';
            content += answerElement[1].textContent + '\r\n';
            console.log(content);
            fs.appendFile('result.txt', content + '\r\n', 'utf-8', () => {});
        }
        done();
    }
});
var c = new Crawler({
    jQuery: jsdom,
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const dom = new JSDOM(res.body);
            const document = dom.window.document;
            let elements = document.getElementsByClassName('view_all');
            for(let element of elements) {
                if(element.href.startsWith('quest/')) {
                    answerUris.push(element.href);
                    a.queue('https://tiku.21cnjy.com/'+ element.href);
                }
            }
        }
        done();
    }
});
c.queue(uris);