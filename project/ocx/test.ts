import axios from 'axios';

(async function main() {
    let res = await axios.request({
        // http://www.bylh.top:4000/data
        url: `http://www.bylh.top:4000/data`,
        method: 'get',
  
        // params: {
        //   market_code: 'ocxeth'
        // },
      });
      console.log(res.data);
})();