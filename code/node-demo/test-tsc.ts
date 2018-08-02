const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Crawler = require('crawler');

var c = new Crawler({
    jQuery: jsdom,
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error: any, res:any, done: any) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});



c.queue([{
    uri: 'https://tiku.21cnjy.com/tiku.php?mod=quest&channel=10&xd=2&type=1&page=1',
    jQuery: jsdom,

    // The global callback won't be called
    callback: function (error: any, res: any, done: any) {
        if(error){
            console.log(error);
        }else{
            // console.log('Grabbed', res.body);
            console.log('----------------------------------------------', res.body);
            const dom = new JSDOM(res.body);
            // console.log(dom);
            const document = dom.window.document;
            console.log(document.getElementsByClassName('questions_col')[0]);
        }
        done();
    }
}]);





