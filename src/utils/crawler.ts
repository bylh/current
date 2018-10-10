import Crawler from 'crawler';
import cheerio from 'cheerio';
import fs from 'fs';

const instance = new Crawler({
    // jQuery: 'cheerio',
    maxConnections: 100,
    // This will be called for each crawled page
    callback: (error: any, res: any, done: any) => {
        
    }
});
// instance.queue({
//     url: 'https://tiku.21cnjy.com/tiku.php?mod=quest&channel=10&xd=2&type=1',
//     page: "1"
// });
// instance.queue([{
//     uri: 'https://www.zhihu.com/explore',
//     callback: (error: any, res: any, done: any) => {
//         if (error) {
//             console.log(error);
//         } else {
//             // let $ = res.$;
//             // $ is Cheerio by default
//             //a lean implementation of core jQuery designed specifically for the server
//             // console.log($("title").text());
//             // $(".question_link").each((index: number, element: any) => {
//             //     console.log(index, element.attribs.href);
//             // });
//             // $(".explore-feed.feed-item").each((index: number, element: any) => {
//             //     console.log(index, element.find(".question_link"));
//             // });
//             let $ = cheerio.load(res.body);
//             // console.log($('.tab-panel').find('.question_link').html() ,$('title').text());
//             $('.tab-panel').find('.question_link').each((index: number, element: CheerioElement) => {
//                 console.log(index, element, element.attribs.href);
//             })
//             fs.writeFile('zhihu.html', $('.tab-panel').find('.question_link'), 'utf-8', err => {
//                 console.log('err:', err);
//             });
//         }
//         done();
//     }
// }]);
instance.queue([{
    uri: 'https://segmentfault.com/channel/frontend',
    callback: (error: any, res: any, done: any) => {
        if (error) {
            console.log(error);
        } else {
            // let $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($("title").text());
            // $(".question_link").each((index: number, element: any) => {
            //     console.log(index, element.attribs.href);
            // });
            // $(".explore-feed.feed-item").each((index: number, element: any) => {
            //     console.log(index, element.find(".question_link"));
            // });
            let $ = cheerio.load(res.body);
            // console.log($('.news-list'));
            // console.log($('.tab-panel').find('.question_link').html() ,$('title').text());
            let titles = $('.news-list').find('.news__item-info').each((index: number, element: CheerioElement) => {
                if(element.children[0].attribs.style == null) return;
                console.log(index, element.children[1].firstChild.children[0].firstChild.data,  'https://segmentfault.com' + element.children[0].attribs.href, 
                element.children[1].children[1].children[0].data,
                element.children[0].attribs.style.match(/background-image:url\((\S*)\)/)[1]);
            });
            // fs.writeFile('zhihu.html', $('.tab-panel').find('.question_link'), 'utf-8', err => {
            //     console.log('err:', err);
            // });
        }
        done();
    }
}]);