// import * as moment from 'moment';
// import * as lodash from 'lodash';
const webpush = require('web-push');
// // import _defaultsDeep from 'lodash/defaultsDeep';
// import defaultsDeep = require('lodash/defaultsDeep');
// import { loadavg } from 'os';
// interface ICache{
//     useCache:boolean;
//     [propName:string]:any;
// }
// const cache:ICache = {useCache:true};
// console.log('test123', cache, moment());

// interface A extends B {
//     x: number,
// }
// interface B {
//     y: number,
// }
// let a: A = {
//     x: 1,
//     y: 2
// }
// let b: B = {y: 10};

// interface LabelledValue {
//     label: string;
//   }

//   function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj);
//   }

//   let myObj = {size: 10, label: "Size 10 Object"};
//   printLabel({size: 10, label: "Size 10 Object"} as LabelledValue);
//   console.log(defaultsDeep(b, a));

//   let c = {
//       a: 1,
//       b: 2,
//       c: 3
//   };
//   let d = {
//       a: 4,
//       b: 4
//   }
// //   console.log(lodash.omit(c, ['c']));
// //   console.log(lodash.assign(c, d));
// //   console.log(lodash.defaults(d, c));
// // console.log({
// //     ...c,
// //     a: 5
// // });
// console.log(lodash.pick(c, ['a', 'b', 'd']));
//   console.log(213);
// console.log('hello', webpush.generateVAPIDKeys());
console.log('123');

// 从数据库取出用户的subsciption

const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/f1Yjv9PSGpI:APA91bEIMfR_VaFN-n1Chg0J4zyQwQFcsh2teFoanESz_ohfrJ5hIKdD51XqgFyzidONeO2zdXj5rVOvi6r7RhaUKHguBBOyX_MMlbFR75JISTh8wzNbLfveVjv6AWPcsGm3Y-lXKPKiJrR8eWKmgKYIKpozqc6bTQ", "expirationTime": null, "keys": { "p256dh": "BP50gLs-Dgfx6MffYoD-SrXs_vjrjSk6Jc2T6hxGZxDy5F1GUiHxwvvgzyZ3cqTw2qDe6qgn_4RLplnKDsOoIMY", "auth": "RlFaBwsCm519TntY7Tyz4A" } };

// push的数据
// const payload = {
//     title: '一篇新的文章',
//     body: '点开看看吧',
//     icon: '/html/app-manifest/logo_512.png',
//     data: {url: "https://fed.renren.com"}
// };
// JSON.stringify(payload)
// console.log('hello');
// webpush.setVapidDetails(
//     'mailto:bylihuan@gmail.com',
//     'BIFluEwi4fqj-mItWfNw2JluxgueFRSCYkDhC1cKqBdAqNdHcFHjBgeGl1cjohSGqZUUvUcqL1lXXbXlrHtfkSo',
//     'XqOsx4D0H85wlCrQn3IMqZECs9mrGdwk8lMOrAvUFL0'
// );
// webpush.setGCMAPIKey('AAAATv5EXmg:APA91bHXNj_mWze_-cURwlq31tvkiz3_nYjbHSrrJIGotHyP_MqKNS0FZqj2rSYUzA4fzx2pbAwB_Cjt2mpxhhgyua4eFIc_5sxhdzWv27oAOLO45ISAhb8euQjorv6KtiY9XLMDeH9GMnVK8Y55oFP9tcaAxTB9mg');
webpush.sendNotification({
    endpoint: 'https://fcm.googleapis.com/fcm/send/evtV54I4vGA:APA91bGb9YFg2lruJKAhNumWCJKQ5CIfB3A3sQL85dIaHD7U5OHrWAUVEnNXu6rG2EdD_Nsr39ddLfSoLaDdoHZpFEqHuforW1Cks04T6hgSlOlJPhi7a3AP2Q6ShzEx3ehqzXFDR6uZAo3npshRN1g5MupZIJ9DEw',
    expirationTime: null,
    keys: {
        p256dh: 'BJo6JKqC5e0lGKqJ2xWJkkGV4TwhkCLnwUbsPf4t3_J1SYimaOjtPFCzRDxlIsE798pTT4n-ZAbX-ZRL8TzOZl4',
        auth: 'PmjjDtStp0iV2EMjEFsiwQ'
    }
}, 'hello', {
        gcmAPIKey: 'AIzaSyBR7RJSH_B51nk0oaxQIY5GGSzLqF6Qork',
        vapidDetails: {
            subject: 'mailto:bylihuan@gmail.com',
            publicKey: 'BIFluEwi4fqj-mItWfNw2JluxgueFRSCYkDhC1cKqBdAqNdHcFHjBgeGl1cjohSGqZUUvUcqL1lXXbXlrHtfkSo',
            privateKey: 'XqOsx4D0H85wlCrQn3IMqZECs9mrGdwk8lMOrAvUFL0',
        },
        // proxy: 'http://97.64.46.130:18443'
        // proxy: 'http://localhost:3000'
    }).then().catch(err => console.log('hello:', err));
