let moment = require('moment');
let timeC = new Date();
// console.log(moment(timeC).utcOffset());
// console.log(timeC.toUTCString());
// var s = '2013-01-01T00:00:00-13:00';
// console.log(moment("2013-01-01T00:00:00-13:00").utcOffset());
// var formatTime02 = moment(dUNIX).format('YYYY-MM-DD hh:mm:ss'); // 输出指定格式的时间
// console.log(formatTime02, formatTime02);
let date = new Date();
// date.setMonth(date.getMonth() - 12)
// console.log(date);
// console.log(date, date.toLocaleString(),date.toLocaleTimeString(), date.toLocaleDateString('en-US'), moment(date).format('YYYY/MM/DD'), Date.parse(date))

// console.log(moment().day(-7));
console.log(date, date.toDateString('ko-KR'), date.toLocaleDateString('ko-KR'), new Date(date.toLocaleDateString('ko-KR')));
console.log('2017.10.13' < '2017.9.29', date.toLocaleDateString('ko-KR') === '2017-12-18');
let a = '2017.12.18';

console.log(a.split('.').map(Number));
let b = new Date();
console.log(new Date(b.toISOString()));

var today = new Date(2017, 12, 18);
var c = today.toLocaleString();
console.log(new Date(2017, 2 ,2).toLocaleDateString('en-US', {
    formatMatcher: 'best fit',
    
    year: 'numeric',
    month: '2-digit',
    
    day: '2-digit',
    
}));
console.log(moment('2017-09-29T04:07:44.267Z').format('YYYY.MM.DD.hh.mm.ss.'), moment().subtract(1, 'days').format('YYYY.MM.DD.hh.mm.ss.'), moment('2017-09-29T04:07:44.267Z').add(1, 'days').format('YYYY.MM.DD.hh.mm.ss.'));
