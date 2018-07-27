import mongoose, { Mongoose, Document } from 'mongoose';
import { Defer } from './common';
import Config from './config';
export interface WebPushInfo {
    user: string,
    privateKey: string,
    publicKey: string,
    gcmApikey: string,
    subject: string,
    pushSubscription: string
}
const CollectUri = `mongodb://${Config.Server.DB.User}:${Config.Server.DB.Pwd}@${Config.Server.IP}:${Config.Server.DB.Port}/web`;
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
    // 初始化连接数据库
    public async init() {
        try {
            this.db = await mongoose.connect(CollectUri);
        } catch (err) {
            throw err;
        }
    }
    public async getOne(conditions: any) {
        let defer = new Defer<any>();
        webPushModel.findOne(conditions, (err, res) => {
            console.log('getOne(): res:', res, 'err', err);
            defer.resolve(res);
        });
        return await defer.promise;;
    }
    public async set(webPushInfo: WebPushInfo): Promise<WebPushInfo> {
        let data = new webPushModel(webPushInfo);
        try {
            await data.save();
        } catch (err) {
            throw err;
        }
        console.log('保存数据成功', webPushInfo);
        return webPushInfo;
    }
}
export default new DBHelper();