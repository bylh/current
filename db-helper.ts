
import mongoose, { Mongoose, Document } from 'mongoose';
export interface WebPushInfo {
    user: string,
    privateKey: string,
    publicKey: string,
    gcmApikey: string,
    subject: string,
    pushSubscription: string
}
const Schema = mongoose.Schema;
const webPushSchema = new Schema({
    user: String,
    privateKey: String,
    publicKey: String,
    gcmApikey: String,
    subject: String,
    pushSubscription: String
});
const webPushModel = mongoose.model('webpushes', webPushSchema);

class DBHelper {
    protected db: Mongoose = null;
    public async init() {
        try {
            this.db = await mongoose.connect('mongodb://bylh:439882@127.0.0.1:27017/web');
        } catch(err) {
            throw err;
        }
    }
    public async get() {
        
    }
    public async set(webPushInfo: WebPushInfo): Promise<WebPushInfo> {
        let data = new webPushModel(webPushInfo);
        let document = await data.save(err => {
            if(err) {
                console.log('错误？', err);
            }
            else{
                console.log('成功');
            }
        });
        console.log('保存数据成功', webPushInfo);
        return webPushInfo;
    }
}
export default new DBHelper();