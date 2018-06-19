import axios from 'axios';
import JsSHA from 'jssha';

(async function test(): Promise<void> {

     // xNBTeVygbSlF6g6TAr8tSXbTdfh91fthNmAlMriB
    // 备注名 coinx-web
    // 4a7cLSrZqdgrVxbL37w1FyxAfxX2wK2bx01tY8Qy
    // 创建时间 2018-06-13 05:39:19
    let shaObj = new JsSHA('SHA-1', 'TEXT');
    // shaObj.update('jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + request.url);
    let signature = shaObj.getHash('HEX'); // 对str使用sha1签名，得到signature
    // let hash = HMAC-SHA256(payload, secret_key).to_hex 
   
    let response = await axios.request({
                url: `https://openapi.ocx.com/api/v2/tickers`,
                method: 'get',
                // params: { access_token },
                // data: {
                //     action_name: 'QR_LIMIT_STR_SCENE',
                //     action_info: {
                //         scene: {
                //             scene_str: param
                //         }
                //     }
                // }
            });
            console.log('res:',response)
})();
